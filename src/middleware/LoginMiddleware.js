const BaseMiddleware = require('./BaseMiddleware');

class LoginMiddleware extends BaseMiddleware {
  constructor(validSchema, constants, errorHandler) {
    super(validSchema, constants, errorHandler);

    this.middleware = 'loginMiddleware';
    
    this.validateLogin = this.validateLogin.bind(this);
  }

  validateLogin(req, res, next) {
    try {
      this.validate(req, res, next);
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginMiddleware;