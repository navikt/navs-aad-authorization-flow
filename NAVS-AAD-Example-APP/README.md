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

