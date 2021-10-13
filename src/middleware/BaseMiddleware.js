class BaseMiddleware {
  constructor(validSchema, constants, errorHandler) {
    const { statusCode, joiErrors } = constants;
    this.validSchema = validSchema();
    this.joiErrors = joiErrors;
    this.statusCode = statusCode;
    this.BadRequest = errorHandler;

    this.validate = this.validate.bind(this);
    this.validateResult = this.validateResult.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
  }

  getErrorMessage(errorObj) {
    const { type } = errorObj;

    const errorInput = errorObj.path[0];
    return this.joiErrors[type][errorInput];
  }

  validateResult(result) {
    if (result.error) {
      const errorMessage = this.getErrorMessage(result.error.details[0]);
      throw new this.BadRequest(errorMessage, this.statusCode.BAD_REQUEST);
    }
  }

  validate(req, _res, _next) {
      const { body } = req;
      const result = this.validSchema.validate(body);
      this.validateResult(result);
  }
}

module.exports = BaseMiddleware;