const express = require('express')
const router = express.Router()
const auth = require('../controllers/authenticate')
const user = require('../controllers/user')
const frontend = require('../../../frontend/index')


// AUTHENTICATION
router.get('/login/:param1?/:param2?/:param3?', auth.authenticateAzure())

router.post('/auth/openid/callback', auth.authenticateAzureCallback())

router.get(`/auth/logout`, auth.logout())

// USER
router.get(`/user/profile`, auth.ensureAuthenticated(), user.getUserProfile())

router.get('/', auth.ensureAuthenticated(), frontend.showFrontPage())

module.exports = router
