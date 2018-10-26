const express = require('express')
const router = express.Router()
const auth = require('../controllers/authenticate')
const user = require('../controllers/user')
const health = require('../controllers/health')
const selftest = require('../controllers/selftest')
const token = require('../controllers/token')
const { api } = require('../config/config')
const frontend = require('../../../frontend/index')

// APPLICATION HEALTH
router.get('/isalive', health.isAlive())

router.get('/selftest', health.selftest())

router.get('/metrics', health.metrics())

// AUTHENTICATION
router.get('/login/:param1?/:param2?/:param3?', auth.authenticateAzure())

router.post('/auth/openid/callback', auth.authenticateAzureCallback())

router.get(`/auth/logout`, auth.logout())

// USER
router.get(`/user/profile`, auth.ensureAuthenticated(), user.getUserProfile())

router.get('/', auth.ensureAuthenticated(), frontend.showFrontPage())

module.exports = router
