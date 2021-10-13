class LoginController {
  constructor(service, constants) {
    const { statusCode, errorMessage, sequelizeCodes } = constants;
    this.service = service;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.sequelizeCodes = sequelizeCodes;

    this.login = this.login.bind(this);
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await this.service.login({ email, password });
      res.status(this.statusCode.OK).json({ token });
    } catch (error) {
      res.status(this.statusCode.BAD_REQUEST).json({ message: this.errorMessage.INVALID_FIELDS });
    }
  }
}

module.exports = LoginController;