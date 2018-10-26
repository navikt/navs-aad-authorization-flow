const getRoles = require('./getroles')

test('Returns an empty array when no match occurs', () => {
  expect(getRoles.matchRoles('["doesnotExist"]')).toEqual([])
})
test('Returns a single group when a match is found', () => {
  expect(getRoles.matchRoles('["xxx"]')).toEqual(['TEST1'])
})
test('Returns multiple groups when a match is found', () => {
  expect(getRoles.matchRoles('["yyy"]')).toEqual(['TEST1', 'TEST2'])
})
