const msgraph = require('../controllers/msgraph')

// USER SESSION

exports.getUserProfile = () => {
  return async (req, res) => {
    const userPhoto = await msgraph.getUserPhoto({
      userId: req.session.userid,
      refreshToken: req.session.refreshToken,
      userUpn: req.session.upn
    })
    const user = {
      userName: req.session.upn,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      displayName: req.session.displayName,
      roles: req.session.roles,
      photo: userPhoto
    }
    console.log(user)
    res.status(200).send(user)
  }
}

