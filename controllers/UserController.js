const BaseController = require('./BaseController');

class UserController extends BaseController {
  async login(userName, password) {
    return await this.axiosInstance.post('/Account/v1/Login', {
      userName,
      password,
    });
  }
}

module.exports = new UserController();
