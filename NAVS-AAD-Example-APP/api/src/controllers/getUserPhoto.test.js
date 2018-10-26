const msgraph = require('./msgraph.js')
const { defaultPhoto } = require('./defaultPhoto.js')
const nock = require('nock')

test('Simulerer getUserPhoto fra azure AD, forventer feil og retur av default photo', async () => {
  const jau = await msgraph.getUserPhoto('tulletestbruker', 'tullerefreshtoken', 'tulleresource')
  expect(jau).toContain(defaultPhoto)
})
