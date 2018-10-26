const token = require('./getAccesstoken')
const nock = require('nock')

process.env.BASTAAZURECONFIG_CLIENTID = 'test_client_id'
process.env.BASTAAZURECONFIG_CLIENTSECRET = 'test_client_secret'
process.env.BASTAAZURECONFIG_CALLBACKURI = 'test_reply_url'

const params = {
  status: 'OK',
  access_token: 'testtoken'
}

const mstoken = nock('https://login.microsoftonline.com')
  .post('/navq.onmicrosoft.com/oauth2/token/', function(req, res) {
    if (
      req.includes('test_client_id') &&
      req.includes('test_client_secret') &&
      req.includes('test_reply_url')
    ) {
      return 1
    } else {
      return 0
    }
  })
  .reply(200, params)

test('Simulerer getToken fra azure AD', async () => {
  const jau = await token.getAccessToken(
    'https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/token/',
    '1.2.3.4'
  )
  expect(jau).toContain('testtoken')
})
