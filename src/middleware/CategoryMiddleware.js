const BaseMiddleware = require('./BaseMiddleware');

class CategoryMiddleware extends BaseMiddleware {
  constructor(validSchema, constants, errorHandler) {
    super(validSchema, constants, errorHandler);
    
    this.middleware = 'category';

    this.validateCategory = this.validateCategory.bind(this);
  }

  validateCategory(req, res, next) {
    try {
      this.validate(req, res, next);
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryMiddleware;