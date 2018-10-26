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
For optimal security [Authentication Code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow) should be used, and only _**<authorization_code>**_ (_responseType = Code_) should be requested from Azure AD, not _**<id_token>**_.
This will ensure that neither _**<id_token>**_, _**<access_token>**_ or _**<refresh_token>**_ has ever been accessible to the client before they reach the application.

## Authorization Code
_**<authorization_code>**_ is a short lived token (default 10 minutes) that is only able to fetch a new _**<id_token>**_ or _**<access_token>**_.
Using _responseType = Code_, _**<authorization_code>**_ will be the only item in the response from Azure AD. The _**<authorization_code>**_ will be returned as a parameter in the URL redirecting the client back to the application's callback endpoint.
In the application's callback endpoint, the application will in turn exchange the _**<authorization_code>**_ for _**<access_token>**_ and _**<refresh_token>**_ as needed.
This ensures the only compromisable entity is the _**<authorization_code>**_

## [ID Token](https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens)
An _**<id_token>**_is only meant to be used for authenticating the user in the frontend application. In practice, this means fetching information about the user, like username, name, email, etc.
The _**<id_token>**_ has a default lifetime of 1 hour and cannot be renewed after expiry unless the user makes a new login in Azure AD.
_**<id_token>**_ is normally not used in an [Authentication Code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow) 

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


