const msgraph = require('../api/src/controllers/msgraph')


exports.showFrontPage = () => {
    return async (req, res) => {
      const userPhoto = await msgraph.getUserPhoto({
        userId: req.session.userid,
        refreshToken: req.session.refreshToken,
        userUpn: req.session.upn
      })
      console.log("\x1b[33m%s\x1b[0m" ,' - showing frontpage')
      res.send(`
        <html>
        <center>
          <h1>NAVs Azure AD Autorization Flow Example APP</h1>
          <a>You are now logged in</a>
          <br></br>
          <p><img src=${userPhoto} width="96" height="96" border="1"/></p>
          <p><b>Name:</b> ${req.session.displayName}</p>
          <p><b>Username:</b> ${req.session.upn}</p>

          <br></br>
          <a href="/auth/logout">Logout</a>
        </center>  
        </html>
      `)
    }
  }

exports.logoutPage = () => {
  return async (req, res) => {
    res.send(`
        <html>
        <center>
          <br><br>
          <p>You are now logged out</p>
          <br><br>
          <a href="/login">Login</a>
        </center>  
        </html>
      `)
  }
}