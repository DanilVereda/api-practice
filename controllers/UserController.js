const BaseController = require('./BaseController');

class UserController extends BaseController {
  async login(userName, password) {
    return await this.axiosInstance.post('/Account/v1/Login', {
      userName,
      password,
    });
  }

  async generateToken(userName, password) {
    return await this.axiosInstance.post('/Account/v1/GenerateToken', {
      userName,
      password,
    });
  }

  async createUser(userName, password) {
    return await this.axiosInstance.post('/Account/v1/User', {
      userName,
      password,
    });
  }

  async deleteUser(userId, token) {
    return await this.axiosInstance.delete(`https://demoqa.com/Account/v1/User/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}

module.exports = new UserController();
