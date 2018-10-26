let arrRoles = []

// match groups in token to roles
exports.matchRoles = groups => {
  groups = JSON.parse(groups)
  groups.forEach(group => {
    Object.keys(roles).forEach(role => {
      if (roles[role].includes(group) && !arrRoles.includes(role)) {
        arrRoles.push(role)
      }
    })
  })
  return arrRoles
}

const roles = {
  ROLE_SUPERUSER: ['6283f2bd-8bb5-4d13-ae38-974e1bcc1aad'], //0000-GA-BASTA_SUPERUSER
  ROLE_PROD_OPERATIONS: [
    '6283f2bd-8bb5-4d13-ae38-974e1bcc1aad',
    'cd3983f1-fbc1-4c33-9f31-f7a40e422ccd'
  ], //0000-GA-env-config-TestAdmin, 0000-GA-BASTA_SUPERUSER
  ROLE_OPERATIONS: ['6283f2bd-8bb5-4d13-ae38-974e1bcc1aad', 'cd3983f1-fbc1-4c33-9f31-f7a40e422ccd'], //0000-GA-env-config-TestAdmin, 0000-GA-BASTA_SUPERUSER
  ROLE_USER: ['928636f4-fd0d-4149-978e-a6fb68bb19de'], //All ad users
  TEST1: ['xxx', 'yyy'],
  TEST2: ['yyy']
}
