const BaseMiddleware = require('./BaseMiddleware');

class PostMiddleware extends BaseMiddleware {
  constructor(validSchema, constants, errorHandler) {
    super(validSchema, constants, errorHandler);

    this.middleware = 'PostMiddleware';

    this.validatePost = this.validatePost.bind(this);
  }

  validatePost(req, res, next) {
    try {
      this.validate(req, res, next);
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostMiddleware;