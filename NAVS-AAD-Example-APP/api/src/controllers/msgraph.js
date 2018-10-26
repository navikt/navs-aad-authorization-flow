const request = require('request-promise').defaults({ encoding: null })
const token = require('./token')
const { defaultPhoto } = require('./defaultPhoto')

exports.getUserPhoto = async ({ userId, refreshToken, userUpn }) => {
  let userPhoto = ''
  let aToken = ''
  const resource = 'https://graph.microsoft.com'
  //const accessToken = await token.getAccessTokenUser(tokenURI, refreshToken, resource)
  const accessToken = await token.validateRefreshAndGetToken(userId, refreshToken, resource)
  //console.log('token: ', accessToken)
  return request
    .get({
      headers: { 'content-type': 'image/jpg' },
      url: `https://graph.microsoft.com/beta/users/${userUpn}/photo/$value`,
      auth: { bearer: accessToken }
    })
    .then(response => {
      userPhoto = 'data:image/jpg;base64,' + new Buffer(response).toString('base64')

      return userPhoto
    })
    .catch(err => {
      //console.log(err)
      userPhoto = defaultPhoto
      return userPhoto
    })
}
