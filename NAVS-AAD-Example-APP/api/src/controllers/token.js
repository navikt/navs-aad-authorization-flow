const token = require('./getAccesstoken')
const config = require('../config/passportConfig')
const finduser = require('../config/findUser')

// GET AND REFRESH ACCESSTOKENS
exports.validateRefreshAndGetToken = async (userid, refreshToken, resource) => {
  let oldAccessToken = ''
  const now = new Date()
  const user = await finduser.findByOid(userid, async function(err, user) {
    return user
  })
  try {
    oldAccessToken = user.tokens.find(token => token.resource === resource).accesstoken
  } catch (err) {
    oldAccessToken = false
  }
  if (user && !oldAccessToken) {
    console.log("\x1b[33m%s\x1b[0m" ,' - found user but no existing accesstoken for ', resource)
    console.log("\x1b[33m%s\x1b[0m" ,' - getting new accessToken for', resource)
    const newAccessToken = await token.getAccessTokenUser(config.tokenURI, refreshToken, resource)
    exp = JSON.parse(exports.decodeToken(newAccessToken)).exp
    if (!user.tokens) {
      user.tokens = []
    }
    user.tokens.push({ resource: resource, accesstoken: newAccessToken, exp: exp })
    return newAccessToken
  }
  if (user && oldAccessToken) {
    console.log("\x1b[33m%s\x1b[0m" ,' - found user and existing accesstoken for', resource)
    const oldtokenExpire = user.tokens.find(token => token.resource === resource).exp
    console.log("\x1b[33m%s\x1b[0m" ,
      ' - accessToken expire',
      new Date(oldtokenExpire * 1000) + ' = ' + (oldtokenExpire * 1000 - Date.parse(now)) + ' ms'
    )
    if (oldtokenExpire * 1000 < Date.parse(now)) {
      console.log("\x1b[33m%s\x1b[0m" ,' - token has expired, getting new accessToken for', resource)
      const newAccessToken = await token.getAccessTokenUser(config.tokenURI, refreshToken, resource)
      exp = JSON.parse(exports.decodeToken(newAccessToken)).exp
      if (!user.tokens) {
        user.tokens = []
      }
      const index = user.tokens.indexOf(user.tokens.find(token => token.resource === resource))
      user.tokens.splice(index, 1)
      user.tokens.push({ resource: resource, accesstoken: newAccessToken, exp: exp })
      return newAccessToken
    } else {
      console.log("\x1b[33m%s\x1b[0m" ,' - accesstoken is stil valid for', resource)
    }
  }

  return oldAccessToken
}

// DECODE TOKEN
exports.decodeToken = encodedToken => {
  if (encodedToken) {
    if (encodedToken.startsWith('eyJ0')) {
      const tokenSplit = encodedToken.split('.')
      const tokenDecoded = Buffer.from(tokenSplit[1], 'base64').toString()
      return tokenDecoded
    } else {
      console.log('token decode error')
      return new Error('not a valid accessToken or id_token')
    }
  } else {
    console.log('no token in input')
    return new Error('no token in input')
  }
}
