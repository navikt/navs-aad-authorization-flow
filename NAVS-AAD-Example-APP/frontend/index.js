exports.showFrontPage = (req, res) => {
    return async (req, res) => {
      //res.status(200).sendFile('index.html', { root: './frontend' })
      res.send(`
        <html>
          <h1>NAVs Azure AD Autorization Flow Example APP</h1>
          <a>Du er nå logget inn</a>
          <br></br>
          <p>navn: ${req.session.displayName}</p>
          <p>Brukernavn: ${req.session.upn}</p>
          
          <br></br>
          <a href="/auth/logout">Logout</a>
        </html>
      `)
    }
  }