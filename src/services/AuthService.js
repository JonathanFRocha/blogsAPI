class AuthService {
  constructor({ jwt, jwtConfig, secret, constants, errorHandler }) {
    const { statusCode, errorMessage } = constants;
    this.jwt = jwt;
    this.config = jwtConfig;
    this.secret = secret;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.BAD_REQUEST = errorHandler;
    this.UNAUTHORIZED = errorHandler;

    this.sign = this.sign.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.checkCredentials = this.checkCredentials.bind(this);
  }

  checkCredentials(token) {
    if (!token) { 
      throw new this.UNAUTHORIZED(this.errorMessage.EMPTY_TOKEN, this.statusCode.UNAUTHORIZED); 
    } else {
     this.jwt.verify(token, this.secret);
    }
  }

  authenticateUser(databaseValue, reqValue) {
    if (!databaseValue
      || databaseValue.email !== reqValue.email
      || databaseValue.password !== reqValue.password) {
        throw new this.BAD_REQUEST(this.errorMessage.INVALID_FIELDS, this.statusCode.BAD_REQUEST);
    }

    const { id, displayName, email } = databaseValue;

    return this.sign({ id, displayName, email });
  }

  decode(token) {
    const decodedToken = this.jwt.verify(token, this.secret);
    return decodedToken;
  }

  sign(data) {
    const token = this.jwt.sign(data, this.secret, this.config);

    return token;
  }
}

module.exports = AuthService;