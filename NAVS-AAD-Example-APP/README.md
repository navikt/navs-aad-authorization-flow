# NAV's AAD authorization flow Example APP
#### Authorize access to Azure Active Directory web applications using OAuth 2.0 code grant flow.

## Prerequisites
1. Registered App in Azure AD (https://github.com/navikt/IaC/tree/master/Azure/registerApplication)
2. .env file with:
   ```
    AZURECONFIG_CLIENTID='<application_id from aad app>'
    AZURECONFIG_CLIENTSECRET='<KEY from aad app>'
    AZURECONFIG_CALLBACKURI='http://localhost:8080/auth/openid/callback'
    COOKIE_KEY1='<32bit cookie encryption key>'
    COOKIE_KEY2='<32bit cookie encryption key>'
    PASSPORTCOOKIE_KEY1='<32bit cookie encryption key>'
    PASSPORTCOOKIE_KEY2='<32bit cookie encryption key>'
    PASSPORTCOOKIE_KEY3='<12bit cookie encryption key>'
    PASSPORTCOOKIE_KEY4='<12bit cookie encryption key>'
    ```
3. A valid Azure AD user

## Run the application
```
from the NAVS-AAD-Example-APP folder, run:

npm install
npm start
```

URL: http://localhost:8080



## How to use passport.js behind a proxy

The Passport-azure-ad is dependent on the node-oauth module (or only oauth). The oauth module unfortionally does not support proxy. To make this work behind a proxy, you have to do the following:

Install the very lates version of oauth + add https-proxy-agent:
``` 
npm install oauth@0.9.15
npm install https-proxy-agent
```

Edit the top section of the file NAVS-AAD-Example-APP\node_modules\oauth\lib\oauth2.js to the following:

```
var querystring= require('querystring'),
    crypto= require('crypto'),
    https= require('https'),
    http= require('http'),
    URL= require('url'),
    OAuthUtils= require('./_utils');

    // Add these two lines
    HttpsProxyAgent = require('https-proxy-agent')
    var agent = new HttpsProxyAgent('http://webproxy.nais:8088')
    // 

exports.OAuth2= function(clientId, clientSecret, baseSite, authorizePath, accessTokenPath, customHeaders) {
  this._clientId= clientId;
  this._clientSecret= clientSecret;
  this._baseSite= baseSite;
  this._authorizeUrl= authorizePath || "/oauth/authorize";
  this._accessTokenUrl= accessTokenPath || "/oauth/access_token";
  this._accessTokenName= "access_token";
  this._authMethod= "Bearer";
  this._customHeaders = customHeaders || {};
  this._useAuthorizationHeaderForGET= false;

  //our agent
  // change this from undefined to agent
  this._agent = agent;
};
```

When building a docker image, make sure this edited file is copyed into the right place in node_modules after you have run npm install:

```
...
# Install any needed packages specified in requirements.txt
RUN npm install

COPY ./node_modules/oauth/lib/oauth2.js /app/node_modules/oauth/lib/oauth2.js
...

```

Build and deploy the docker image as normal to NAIS

## mandatory requirements to verify an accessToken

 > [How to verify the accessToken](./verifyToken.md)

## examples of different types of Azure AD tokens

 > [Azure AD token examples](./tokenExamples.md)

## More information

> Get Started with Azure AD authentication: https://docs.microsoft.com/nb-no/azure/active-directory/develop/v1-overview
> 
> Description of the Open ID Connect protocol: https://docs.microsoft.com/nb-no/azure/active-directory/develop/v1-protocols-openid-connect-code
> 
> Description of the Oauth2 autorization code flow: https://docs.microsoft.com/nb-no/azure/active-directory/develop/v1-protocols-oauth-code
> 
> AccessTokens: https://docs.microsoft.com/nb-no/azure/active-directory/develop/access-tokens
> 
> Validating tokens: https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens#validating-tokens
> 
> An other Node.js example: https://docs.microsoft.com/nb-no/azure/active-directory/develop/quickstart-v1-nodejs-webapi
> 
> Code samples: https://docs.microsoft.com/nb-no/azure/active-directory/develop/sample-v1-code
> 

