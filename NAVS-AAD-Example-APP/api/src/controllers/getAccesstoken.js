const request = require('request-promise')
let ms_access_token = ''

// GET SERVICE-SERVICE ACCESSTOKEN - Not in Use in this example
exports.getAccessToken = async (tokenURI, resource) => {
  let parameters = ''
  try {
    parameters = {
      client_id: process.env['AZURECONFIG_CLIENTID'],
      resource: resource,
      redirect_uri: process.env['AZURECONFIG_CALLBACKURI'],
      grant_type: 'client_credentials',
      client_secret: process.env['AZURECONFIG_CLIENTSECRET']
    }
    await request.post({ url: tokenURI, formData: parameters }, function callback(
      err,
      httpResponse,
      body
    ) {
      ms_access_token = JSON.parse(body).access_token
      return ms_access_token
    })
    return ms_access_token
  } catch (e) {
    return e
  }
}

// GET USER SPESIFIC ACCESSTOKEN
exports.getAccessTokenUser = async (tokenURI, refreshToken, resource) => {
  let parameters = ''
  try {
    parameters = {
      client_id: process.env['AZURECONFIG_CLIENTID'],
      resource: resource, 
      redirect_uri: process.env['AZURECONFIG_CALLBACKURI'],
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_secret: process.env['AZURECONFIG_CLIENTSECRET']
    }
    await request.post({ url: tokenURI, formData: parameters }, function callback(
      err,
      httpResponse,
      body
    ) {
      console.log("\x1b[33m%s\x1b[0m" ,' - got accessToken in return from Azure AD for', resource)
      ms_access_token = JSON.parse(body).access_token
    })
    return ms_access_token
  } catch (e) {
    return e
  }
}

// GET ACCESSTOKEN ON BEHALF OF EXISITING ACCESSTOKEN
exports.getAccessTokenOnBehalf = async (tokenURI, accessToken, resource) => {
  let parameters = ''
  try {
    parameters = {
      client_id: process.env['AZURECONFIG_CLIENTID'],
      resource: resource, // process.env['BASTAAZURECONFIG_CLIENTID'],
      assertion: accessToken,
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      requested_token_use: 'on_behalf_of',
      scope: 'openid',
      client_secret: process.env['AZURECONFIG_CLIENTSECRET']
    }
    await request.post({ url: tokenURI, formData: parameters }, function callback(
      err,
      httpResponse,
      body
    ) {
      ms_access_token = JSON.parse(body).access_token

      // console.log('access token: ', ms_access_token)
    })
    return ms_access_token
  } catch (e) {
    //console.error('Could not get access_token', e)
    return e
  }
}
