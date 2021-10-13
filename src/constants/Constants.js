const ErrorMessages = require('./ErrorMessages');
const JoiErrors = require('./JoiErrors');
const MinimumCharacters = require('./MinimumCharacters');
const SequelizeCodes = require('./SequelizeCodes');
const StatusCode = require('./StatusCode');

class Constants {
  constructor({ statusCode, errorMessage, minChar, joiErrors, sequelizeCodes }) {
    this.DISPLAY_NAME_MIN_CHARACTERS = minChar.displayName;
    this.PASSWORD_MIN_CHARACTERS = minChar.password; 
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.joiErrors = joiErrors;
    this.sequelizeCodes = sequelizeCodes;
  }
}

module.exports = new 
  Constants({
    statusCode: StatusCode.codes,
    errorMessage: ErrorMessages.message,
    joiErrors: JoiErrors.error,
    minChar: MinimumCharacters.minChar,
    sequelizeCodes: SequelizeCodes.codes,
    });