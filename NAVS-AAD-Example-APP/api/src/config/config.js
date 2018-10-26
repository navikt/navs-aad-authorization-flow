if (process.env['NODE_ENV'] === 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  exports.api = process.env['API_VERSION'] || '/api/v1'
  exports.host = process.env['HOST'] || 'localhost'
  exports.port = process.env['PORT'] || '8080'
  exports.sessionSecret = process.env['SESSION_SECRET'] || 'H3mligereEnnDetteBlirDetIkke!'
  exports.cookieDomain = ''
} else if (process.env['NODE_ENV'] === 'development' || process.env['NODE_ENV'] === 'offline') {
  exports.api = '/api/v1'
  exports.host = 'localhost'
  exports.port = 8080
  exports.sessionSecret = 'H3mligereEnnDetteBlirDetIkke!'
  exports.cookieDomain = ''
}
