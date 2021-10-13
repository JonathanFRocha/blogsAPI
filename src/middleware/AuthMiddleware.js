class AuthMiddleware {
  constructor(authService, constants) {
    const { statusCode, errorMessage } = constants;
    this.authService = authService;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;

    this.checkCredentials = this.checkCredentials.bind(this);
  }

  checkCredentials(req, _res, next) {
    try {
      const { authorization } = req.headers;
      this.authService.checkCredentials(authorization);
      next();
    } catch (e) {
      if (e.message !== this.errorMessage.EMPTY_TOKEN) {
        e.message = this.errorMessage.INVALID_TOKEN;
        e.statusCode = this.statusCode.UNAUTHORIZED;
      }

      next(e);
    }
  }
}

module.exports = AuthMiddleware;