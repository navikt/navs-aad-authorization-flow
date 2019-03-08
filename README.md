# NAV's AAD authorization flow
#### Authorize access to Azure Active Directory web applications using OAuth 2.0 code grant flow.

## General description of Azure AD Authentication for NAV applications
![general flow](/_media/general-flow.png "Example authorization flow")
1. Login request for the application. The application redirects the user to Azure AD with relevant configuration parameters.
1. Azure AD provides an _**<authorization_code>**_ and redirects the client back to the application
1. The client presents its _**<authorization_code**_  to the application, which in turn exchange the code for an _**<id_token>**_ and a _**<refresh_token>**_. The application also validates the token and authenticate the user based on the content of the _**<id_token>**_.
1. For every service accessed by the application, it will request an _**<access_token**_ for each specific backend using the user's _**<refresh_token>**_
1. Azure AD returns an _**<access_token>**_ based on the content of the request.
1. The application adds the _**<access_token>**_ as an authorization header in the request to the backend.
1. The backend service validates the _**<access_token>**_ using the signing certificate referenced in the _**<access_token>**_
1. The signing certificate is returned to the backend application, who verifies that the _**<access_token>**_'s signature is valid.

## Choice of Authorization flow
There are many authorization flows available in Azure AD and OIDC/Oauth2.
Choice of flow determine what AAD will return (code and/or id_token), how it will be returned and what it can be used for after a successful login.
For optimal security [Authorization Code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow) should be used, and only _**<authorization_code>**_ (_responseType = Code_) should be requested from Azure AD, not _**<id_token>**_.
This will ensure that neither _**<id_token>**_, _**<access_token>**_ or _**<refresh_token>**_ has ever been accessible to the client before they reach the application.

## Authorization Code
_**<authorization_code>**_ is a short lived token (default 10 minutes) that is only able to fetch a new _**<id_token>**_ or _**<access_token>**_.
Using _responseType = Code_, _**<authorization_code>**_ will be the only item in the response from Azure AD. The _**<authorization_code>**_ will be returned as a parameter in the URL redirecting the client back to the application's callback endpoint.
In the application's callback endpoint, the application will in turn exchange the _**<authorization_code>**_ for _**<access_token>**_ and _**<refresh_token>**_ as needed.
This ensures the only compromisable entity is the _**<authorization_code>**_

## [ID Token](https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens)
An _**<id_token>**_is only meant to be used for authenticating the user in the frontend application. In practice, this means fetching information about the user, like username, name, email, etc.
The _**<id_token>**_ has a default lifetime of 1 hour and cannot be renewed after expiry unless the user makes a new login in Azure AD.
_**<id_token>**_ is normally not used in an [Authorization Code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow) 

## [Access Token](https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens)
An _**<access_token>**_ is used to grant access to frontend applications or backend services.
The _**<access_token>**_ is issued for a specific resource or service and if the user requires access to a different set of services, a separate _**<access_token>**_ should be requested. 
One _**<access_token>**_ per service.

specificAn _**<access_token>**_  has a default lifetime of 1 hour, but can be renewed on expiry using a _**<access_token>**_ r service and if the user requires access to a different set of services, a separate _**<access_token>**_ should be requested. 
One _**<access_token>**_ per service.

An _**<access_token>**_ has a default lifetime of 1 hour, but can be renewed on expiry using the _**<refresh_token>**_.
This routine is implemented in the application itself.

## [Refresh Token](https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens)
The _**<refresh_token>**_'s sole purpose is to renew _**<access_token>**_ (s)
A _**<refresh_token>**_ has a default lifetime of 14 days. In contrast to _**<id_token>**_ and _**<access_token>**_, a _**<refresh_token>**_ can be revoked, voiding its validity.

## Stateless configuration
To achieve stateless logon to an application, the _**<refresh_token>**_ is written to a session cookie.

The _**<access_token>**_ is cached in the application itself, and is never presented to or accessible in the browser.
If the application has lost its state, the new application instance is able to retrieve a new _**<access_token>**_ using the _**<refresh_token>**_ stored in the user's session cookie.
This process is transparent to the end-user.

For every backend call, the _**<access_token>**_'s validity should be verified. If an _**<access_token>**_ is about to expire, the application should retrieve a fresh _**<access_token>**_ using the _**<refresh_token>**_.

If a browser session expires, the application should redirect the user to do a new log in on Azure AD.
Given that this is the same browser the user originally logged in to Azure AD with, Azure AD will recognize the user and do a transparent login without demanding username and password before redirecting the user back to the application

## Company user login vs. Consumer user login

#### Consumer user login
To enable consumer user login we must use Azure AD B2C and integrate it with [id_porten](https://eid.difi.no/nb/id-porten). Azure AD B2C supports the Authorization Code flow the same way as Azure AD.

One limitation with Azure AD B2C is that it does not support "on behaf of flow", where a backend service can use the accesstoken to request a new accesstoken to an other backend service, on behaf of the user. With Azure AD B2C this only works with the refreshToken. An alternative solution is to request and use a service-service accesstoken insted.

#### Company user login
An employee in NAV use its e-mail address as username to log in to the application with Azure AD. In some circumstances Multi Factor Authentication will be required. From an company managed Windows 10 computer the user will have full Single Sign-On to Azure AD integrated applications, no typing of username and password will be necessary.

To achive proper access management to the applications, they should be direct integrated with Azure AD. Only then the persmission to the application can be controlled by Azure AD. Azure AD can give access to the applications based on user groups, or even map user groups to spesific application roles. This roles will then be found in the token as an attribute. Use of application roles from Azure AD insted of user group mapping inside the application wil reduce the size of the accessToken.

Direct integration with Azure AD is also the only way to utilizise Conditional Access in Azure AD. With Conditional Access you can configure cirtain requirements to get access to the application. For exampel that the login request must come from a spesific network (i.e the company network), that login from smartphones will be denied, control if and when MFA should be required, control if the client should be a company managed client to allow login, and so on.

## App registration in Azure AD
To be able to comunicate with Azure AD like log in users, request aaccessToken and so on, the application must have a valid client_id and client_secret. This is generated by doing an ["App registration"](https://github.com/navikt/IaC/tree/master/Azure/registerApplication) in Azure AD.

Your applications access to other services, like the Microsoft Graph API, is controled by permissions on the App registered in Azure AD. It's also by this App in Azure AD, you can control who is getting permission to log in to your application.

All backend services you want to request accessToken to, must also be registered with an App in Azure AD. It's only to Azure AD known App_Id's you will be able to get an accessToken for. The app_id will then be in the "aud:" attribute in the accessToken.

## Security considerations

#### Exposure of the id_token
In Authentication flow's where the id_token is returned as a part of the reply url, the id_token will be exposed for theft by malware or other evil minded missuse.

To minimize risk for such evil minded missuse, authorization-code-flow is recomended. Then an autorization_code is the only thing returned in the reply url. This authorization_code is short lived (10min), and can only be exchanged in id_token an/or accesstoken/refreshtoken together with a valid client_id and client_secret. Normaly don by the application(-server). In that way the tokens are never put in risk for being exposed for outsiders.

#### How hard is it necessary to protect the refreshToken?
The refreshToken is long-lived (normaly 14days) and can be used to request new accessToken, but not without a valid client_id and client_secret. It can nighter be used by it self to get access to backend services like an accessToken. If it is suspicion that the refreshToken is compromised, it can be revoked by the user it self or an administrator.

On the basis of these characteristics it should be safe to save the refreshToken in a session cookie.

The cookie should anyway:
 - Be encrypted with strong encryption keys
 - tied to relevant domain
 - created ony when https is used

## Application implementation details
##### An example application flow based on express using passport.js
![application-implementation-details](/_media/application-implementation-details.png "Application implementation details")

1. When the user first attempts to access the application, the request will go through a [`ensureAuthenticated()`](https://github.com/navikt/basta-frontend/blob/master/api/src/controllers/authenticate.js#L46-L64) method, where we see if the user already `isAuthenticated()`
If the user is authenticated, we [`validateRefreshAndGetToken()`](https://github.com/navikt/basta-frontend/blob/master/api/src/controllers/token.js#L51-L95) to ensure the token's validity and expiry date.
As this is the first time the user access the application, we find no valid user session, and the user i redirected to /login

1. /login triggers the [`authenticateAzure()`](https://github.com/navikt/basta-frontend/blob/master/api/src/controllers/authenticate.js#L7-L28) method, where an [authorization URL](https://github.com/navikt/basta-frontend/blob/master/api/src/controllers/authenticate.js#L16) will be built based on the [passport configuration](https://github.com/navikt/basta-frontend/blob/master/api/src/config/passport.js).
The user is then redirected to the generated user specific authorization URL on Azure AD.

1. When the user has successfully logged, Azure AD will redirect the user to the application's /callback endpoint with _**<authorization_code>**_ as a url parameter.

1. The application's /callback endpoint will [`authenticateAzureCallback()`](https://github.com/navikt/basta-frontend/blob/master/api/src/controllers/authenticate.js#L30-L42) 

1. passport will fetch the user's _**<id_token>**_ and _**<refresh_token>**_ using the provided _**<authorization_code>**_ from Azure AD.

1. The user's details, along with the _**<refresh_token>**_, will be saved in the local user storage. 
Additionally, the _**<refresh_token>**_ will be stored in a session cookie.

1. Once passport has finished [`authenticateAzureCallback()`](https://github.com/navikt/basta-frontend/blob/master/api/src/controllers/authenticate.js#L30-L42), the user will be redirected back to / (or to the URI the user was on before login was triggered), and [`ensureAuthenticated()`](https://github.com/navikt/basta-frontend/blob/master/api/src/controllers/authenticate.js#L46-L64) will recognize that the user `isAuthenticated()` and serve the frontend application.

## NAVs AAD Example App
We have created an example app to easy test and get known of the authorization flow.

https://github.com/navikt/navs-aad-authorization-flow/tree/master/NAVS-AAD-Example-APP


## Contact
Any questions about this article, solution or example app can be directed to:

    - Kjetil Nordlund (kjetil.nordlund@nav.no)
    - Frode Sundby (frode.sundby@nav.no)

For NAV-employees questions can be asked on Slack in the channel #aura
