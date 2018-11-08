'use strict'

const { host, sessionSecret, cookieDomain } = require('./config/config')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('cookie-session')
const router = require('./routes/index')
const helmet = require('helmet')
require('./config/passport')(passport)
const { startApp } = require('./startApp')
const { logoutURL } = require('../src/config/passportConfig')
//const globalTunnel = require('global-tunnel-ng')
const app = express()

// HELMET
app.use(helmet())

// webproxy support
//globalTunnel.initialize({
//  host: 'webproxy.nais',
//  port: '8088'
//})

// CORS
const cors = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', host)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-AUTHENTICATION, X-IP, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  )
  return next()
}
app.use(cors)

// SESSION
app.use(bodyParser.json())
app.use(cookieParser(process.env['COOKIE_KEY1']))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1)

app.use(
  session({
    name: 'navaadexample',
    keys: [`${process.env['COOKIE_KEY1']}`, `${process.env['COOKIE_KEY2']}`],
    maxAge: 24 * 60 * 60 * 1000, // 24 timer
    domain: cookieDomain
  })
)
app.use(passport.initialize())
app.use(passport.session())

// health
app.get('/isalive', (req, res) => {
  res.send('OK').status(200)
})

// ROUTES
app.use('/', router)

// ERROR HANDLING
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send(err)
  next()
})




// STARTUP
startApp(app)

module.exports = app
