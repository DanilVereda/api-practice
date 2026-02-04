const UserController = require('../../controllers/UserController');
const { users } = require('../../test-data/users');

const axios = require('axios').default;

describe('Login and generate token', () => {
  test('Success login', async () => {
    const response = await UserController.login(users.user1.username, users.user1.password);
    const userData = response.data;
    expect(response.status).toBe(200);
    expect(userData.username).toBe('danver');
    expect(userData.token).not.toBeUndefined();
  });

  test('Generate token', async () => {
    const response = await UserController.generateToken(users.user1.username, users.user1.password);
    const userData = response.data;
    const expiresAt = new Date(response.data.expires);
    const now = new Date();
    expect(response.status).toBe(200);
    expect(userData.status).toBe('Success');
    expect(userData.result).toBe('User authorized successfully.');
    expect(userData.token).toBeDefined();
    expect(expiresAt.getTime()).toBeGreaterThan(now.getTime());
  });
});

describe('Create user, login and delete user', () => {
  let token;
  let userId;
  test('Create user', async () => {
    const response = await UserController.createUser(users.user2.username, users.user2.password);
    const userData = response.data;
    expect(response.status).toBe(201);
    userId = userData.userId;
  });

  test('Login user', async () => {
    const response = await UserController.login(users.user2.username, users.user2.password);
    const userData = response.data;
    token = userData.token;
    expect(response.status).toBe(200);
    expect(userData.token).toBeDefined();
  });

  test('Delete user', async () => {
    const response = await UserController.deleteUser(userId, token);
    expect([200, 204, 404]).toContain(response.status);
  });
});
