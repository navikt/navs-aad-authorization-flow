const msgraph = require('../api/src/controllers/msgraph')


exports.showFrontPage = (req, res) => {
    return async (req, res) => {
      const userPhoto = await msgraph.getUserPhoto({
        userId: req.session.userid,
        refreshToken: req.session.refreshToken,
        userUpn: req.session.upn
      })
      res.send(`
        <html>
          <h1>NAVs Azure AD Autorization Flow Example APP</h1>
          <a>Du er nå logget inn</a>
          <br></br>
          <p><img src=${userPhoto} width="96" height="96"/></p>
          <p>navn: ${req.session.displayName}</p>
          <p>Brukernavn: ${req.session.upn}</p>

          <br></br>
          <a href="/auth/logout">Logout</a>
        </html>
      `)
    }
  }