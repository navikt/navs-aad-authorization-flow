exports.users = []

exports.findByOid = function(oid, fn) {
  for (let i = 0, len = exports.users.length; i < len; i++) {
    var user = exports.users[i]
    //console.log('we are using user: ', user.upn)
    if (user.oid === oid) {
      return fn(null, user)
    }
  }
  return fn(null, null)
}
