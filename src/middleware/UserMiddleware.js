const BaseMiddleware = require('./BaseMiddleware');

class UserMiddleware extends BaseMiddleware {
  constructor(validSchema, constants, errorHandler) {
    super(validSchema, constants, errorHandler);

    this.middleware = 'UserMiddleware';

    this.validateUser = this.validateUser.bind(this);
  }

  validateUser(req, res, next) {
    try {
      this.validate(req, res, next);
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserMiddleware;