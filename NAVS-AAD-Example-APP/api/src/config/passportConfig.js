exports.clientID = process.env['AZURECONFIG_CLIENTID']
exports.clientSecret = process.env['AZURECONFIG_CLIENTSECRET']
exports.responseType = 'code'
exports.responseMode = 'form_post'
exports.redirectUrl = process.env['AZURECONFIG_CALLBACKURI']
exports.passReqToCallback = true
exports.scope = 'profile offline_access'
exports.validateIssuer = true
//exports.resourceURL = 'https://graph.microsoft.com'
exports.useCookieInsteadOfSession = true
const key1 = process.env['PASSPORTCOOKIE_KEY1']
const key2 = process.env['PASSPORTCOOKIE_KEY2']
const key3 = process.env['PASSPORTCOOKIE_KEY3']
const key4 = process.env['PASSPORTCOOKIE_KEY4']
const passportkey1 = { key: key1, iv: key3 }
const passportkey2 = { key: key2, iv: key4 }
exports.cookieEncryptionKeys = [passportkey1, passportkey2]
exports.nonceLifetime = 36000

if (process.env['NODE_ENV'] === 'production') {
  exports.identityMetadata =
    'https://login.microsoftonline.com/navno.onmicrosoft.com/.well-known/openid-configuration'
  exports.tokenURI = `https://login.microsoftonline.com/navno.onmicrosoft.com/oauth2/token`
  exports.logoutURL = `https://login.microsoftonline.com/navno.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=http:\\\\basta.nais.io:8080`
  exports.allowHttpForRedirectUrl = false
  exports.loggingLevel = 'error'
} else if (process.env['NODE_ENV'] === 'development') {
  exports.identityMetadata =
    'https://login.microsoftonline.com/navq.onmicrosoft.com/.well-known/openid-configuration'
  exports.tokenURI = `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/token`
  exports.logoutURL = `https://login.microsoftonline.com/966ac572-f5b7-4bbe-aa88-c76419c0f851/oauth2/logout?post_logout_redirect_uri=http:\\\\localhost:8080`
  exports.allowHttpForRedirectUrl = true
  exports.loggingLevel = 'error'
}
