# NAV's AAD authorization flow Example APP
#### Authorize access to Azure Active Directory web applications using OAuth 2.0 code grant flow.

## Mandatory requirements to verify the validity of an accessToken

To accept an accessToken and ensure its validity you have to to the following validations:

# Signature: To ensure the token is issued by Azure AD, and not tampered with after it is issued
1. Get the "jwks_uri" from https://login.microsoftonline.com/'tennant name'/.well-known/openid-configuration
    1. It should normaly be https://login.microsoftonline.com/common/discovery/keys
2. decode the token and get the "kid" value from the header
```
   {
  "typ": "JWT",
  "alg": "RS256",
  "x5t": "iBjL1Rcqzhiy4fpxIxdZqohM2Yk",
  "kid": "iBjL1Rcqzhiy4fpxIxdZqohM2Yk"
    }
   ```
3. The "kid" value in the header refer to a certificate in the "jwks_uri". Find the matching "kid" value in "jwks_uri" and download the coresponding certificate in the "x5c" value.
```
{"keys":[{"kty":"RSA","use":"sig","kid":"iBjL1Rcqzhiy4fpxIxdZqohM2Yk","x5t":"iBjL1Rcqzhiy4fpxIxdZqohM2Yk","n":"mtRp-flf1CRQNELJgexsre0aBxDUaIcRysmaYBxWxgH0r2cfdwoe7edWto5rMbkSkXVxxV8969Cz6WDmX3SmOSAdVMu3nVXcIOVIbnII5Rz9W6j5YrInyP_FPQ_XuZ4WMfXuItGXN8bofel1ehBbhS9YEvgFpfPBCvSD1JVCrUD_YZtXFGPS0--9ncTxNPEcso3NJrp-FDESZ8f8nfjRB1mfcePwGdKsuzndL3FGPbLn8hpO4ZXn_KysIma4XBnqvbs0X0AqWEG_g7abL63HM9Ci7QO7PY6Rm5XDci-Kh-conWcKXv5zt5NOKgjOiepr5VN3bjSl8cpT2gtZStFtSw","e":"AQAB","x5c":["MIIDBTCCAe2gAwIBAgIQKGZsKfAUzaJHVantyrwVdzANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJhY2NvdW50cy5hY2Nlc3Njb250cm9sLndpbmRvd3MubmV0MB4XDTE4MTAwMTAwMDAwMFoXDTIwMTAwMTAwMDAwMFowLTErMCkGA1UEAxMiYWNjb3VudHMuYWNjZXNzY29udHJvbC53aW5kb3dzLm5ldDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJrUafn5X9QkUDRCyYHsbK3tGgcQ1GiHEcrJmmAcVsYB9K9nH3cKHu3nVraOazG5EpF1ccVfPevQs+lg5l90pjkgHVTLt51V3CDlSG5yCOUc/Vuo+WKyJ8j/xT0P17meFjH17iLRlzfG6H3pdXoQW4UvWBL4BaXzwQr0g9SVQq1A/2GbVxRj0tPvvZ3E8TTxHLKNzSa6fhQxEmfH/J340QdZn3Hj8BnSrLs53S9xRj2y5/IaTuGV5/ysrCJmuFwZ6r27NF9AKlhBv4O2my+txzPQou0Duz2OkZuVw3IviofnKJ1nCl7+c7eTTioIzonqa+VTd240pfHKU9oLWUrRbUsCAwEAAaMhMB8wHQYDVR0OBBYEFFve38eLO2PUMXcqbBC/YDaayIbrMA0GCSqGSIb3DQEBCwUAA4IBAQCWhrem9A2NrOiGesdzbDy2K3k0oxjWMlM/ZGIfPMPtZl4uIzhc+vdDVVFSeV8SKTOEIMjMOJTQ3GJpZEHYlyM7UsGWiMSXqzG5HUxbkPvuEFHx7cl9Ull3AEymB2oVPC9DPtLUXPyDH898QgEEVhAEI+JZc1Yd6mAlY/5nOw5m2Yqm+84JOPWLgFDqfVmz/MH27LS1rnzzc+0hhcm/Nv/x7FmpOeRfh00BjCA4PogJlpjl/z/6+GTYcYFsvKE3jmmXka8tQbBOHgAlMnamFA8xGeDok6QaxOELu8NSWzvyZXM2lJK5WFQPHF2hjnNXs6+RxOovG55Ybpo52c2frhNZ"]} ]}
```
4. Use the downloaded certificate to verify the signature. We recomend to use a proper library to do this verification.

## Audience field
The audience field should match the recieving application app_id in Azure AD. ie:  
```
"aud": "e7aada64-06d1-4148-95c9-a1fcceef44",
```

If you will request tokens to a backend API, an Azure AD applications should be registered for that API, and tokens should be requested with that applications "application ID" as a resource parameter. The generated token will then get the same "application ID" in the "aud:" field. The backend API should know about its own "application ID" and must verify that all tokens have that ID in the "aud:" field.

## token expiration
```
  "iat": 1541663530, <-- time the token was issued
  "nbf": 1541663530, <-- not valid before
  "exp": 1541667430, <-- time of expiration
```
It must be verified that the token it's between its validity period (nbf < now() < exp).

## validations of claims
1. Check the **"scp"** or **"roles"** claim to verify that all present scopes match those exposed by your API, and allow the client to perform the requested action.
2. Ensure the calling client is allowed to call your API using the **"appid"** claim.
3. Validate the authentication status of the calling client using **"appidacr"** - it should not be 0 if public clients are not allowed to call your API.
4. Check against a list of past **"nonce"** claims to verify the token is not being replayed.
5. Check that the **"tid"** matches a tenant that is allowed to call your API.
6. Use the **"acr"** claim to verify the user has performed MFA. Note that this should be enforced using conditional access.
7. If you've requested the **"roles"** or **"groups"** claims in the access token, verify that the user is in the group allowed to perform this action.


## More information

> Validating tokens: https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens#validating-tokens

