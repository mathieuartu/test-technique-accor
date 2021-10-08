const userService = require('../../../../../src/core/services/user');

describe('UserService', () => {
  test('getUsers() returns all users', () => {
    expect(userService.getUsers()).toBeDefined();
    expect(userService.getUsers().length).toBe(10);
  })
});