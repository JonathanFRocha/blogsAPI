class LoginService {
  constructor(model, authService) {
    this.model = model;
    this.authService = authService;
    
    this.login = this.login.bind(this);
  }

  async login({ email, password }) {
    const result = await this.model.findOne({ where: { email } });
    const token = this.authService.authenticateUser(result, { email, password });
    return token;
  }
}

module.exports = LoginService;