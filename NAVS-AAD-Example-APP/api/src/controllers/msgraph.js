const request = require('request-promise').defaults({ encoding: null })
const token = require('./token')
const { defaultPhoto } = require('./defaultPhoto')

// GET USERS PHOTO FROM MICROSOFT GRAPH API
exports.getUserPhoto = async ({ userId, refreshToken, userUpn }) => {
  console.log("\x1b[33m%s\x1b[0m" ,' - requesting userphoto from graph.microsoft.com')
  let userPhoto = ''
  const resource = 'https://graph.microsoft.com'
  const accessToken = await token.validateRefreshAndGetToken(userId, refreshToken, resource)
  return request
    .get({
      headers: { 'content-type': 'image/jpg' },
      url: `https://graph.microsoft.com/beta/users/${userUpn}/photo/$value`,
      auth: { bearer: accessToken }
    })
    .then(response => {
      userPhoto = 'data:image/jpg;base64,' + new Buffer.from(response).toString('base64')
      console.log("\x1b[33m%s\x1b[0m" ,' - got users photo in return from graph.microsoft.com')
      return userPhoto
    })
    .catch(err => {
      console.log("\x1b[33m%s\x1b[0m" ,' - an error occured getting user photo, sending default photo. Make sure your Azure AD app has access to the Graph API and that the user has a photo uploaded')
      userPhoto = defaultPhoto
      return userPhoto
    })
}
