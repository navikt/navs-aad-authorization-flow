const request = require('request-promise')
let ms_access_token = ''

// GET SERVICE-SERVICE ACCESSTOKEN
exports.getAccessToken = async (tokenURI, resource) => {
  let parameters = ''
  try {
    parameters = {
      client_id: process.env['BASTAAZURECONFIG_CLIENTID'],
      resource: resource,
      redirect_uri: process.env['BASTAAZURECONFIG_CALLBACKURI'],
      grant_type: 'client_credentials',
      client_secret: process.env['BASTAAZURECONFIG_CLIENTSECRET']
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
      client_id: process.env['BASTAAZURECONFIG_CLIENTID'],
      resource: resource, 
      redirect_uri: process.env['BASTAAZURECONFIG_CALLBACKURI'],
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_secret: process.env['BASTAAZURECONFIG_CLIENTSECRET']
    }
    await request.post({ url: tokenURI, formData: parameters }, function callback(
      err,
      httpResponse,
      body
    ) {
      ms_access_token = JSON.parse(body).access_token
    })
    return ms_access_token
  } catch (e) {
    return e
  }
}
