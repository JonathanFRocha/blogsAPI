const MinimumCharacters = require('./MinimumCharacters');

class ErrorMessage {
  constructor(minChar) {
    this.DISPLAY_NAME_MIN_CHARACTERS = minChar.displayName;
    this.PASSWORD_MIN_CHARACTERS = minChar.password;
    this.message = {};

    this.getMessages = this.getMessages.bind(this);
    this.getInvalidMessages = this.getInvalidMessages.bind(this);
    this.getEmptyMessages = this.getEmptyMessages.bind(this);
    this.getRequiredMessages = this.getRequiredMessages.bind(this);
    this.getUserMessages = this.getUserMessages.bind(this);
    this.getNotFound = this.getNotFound.bind(this);
    this.getUnallowed = this.getUnallowed.bind(this);

    this.getMessages();
  }
  
  getInvalidMessages() {
    this.message = { 
      ...this.message,
      INVALID_DISPLAY_NAME: 
      `"displayName" length must be at least ${this.DISPLAY_NAME_MIN_CHARACTERS} characters long`,
      INVALID_EMAIL: '"email" must be a valid email',
      INVALID_PASSWORD: `"password" length must be ${this.PASSWORD_MIN_CHARACTERS} characters long`,
      INVALID_FIELDS: 'Invalid fields',
      INVALID_TOKEN: 'Expired or invalid token',
      INVALID_USER: 'Unauthorized user',
    };
  }

  getEmptyMessages() {
    this.message = { 
      ...this.message,
      EMPTY_PASSWORD: '"password" is not allowed to be empty',
      EMPTY_EMAIL: '"email" is not allowed to be empty',
      EMPTY_CATEGORY_NAME: '"name" is not allowed to be empty',
      EMPTY_TOKEN: 'Token not found',
      EMPTY_TITLE: '"title" is not allowed to be empty',
    };
  }

  getRequiredMessages() {
    this.message = { 
      ...this.message, 
      REQUIRED_EMAIL: '"email" is required',
      REQUIRED_PASSWORD: '"password" is required',
      REQUIRED_DISPLAY_NAME: '"displayName" is required',
      REQUIRED_CATEGORY_NAME: '"name" is required',
      REQUIRED_TITLE: '"title" is required',
      REQUIRED_CONTENT: '"content" is required',
      REQUIRED_CATEGORY_IDS: '"categoryIds" is required',
    };
  }

  getUserMessages() {
    this.message = { 
      ...this.message, 
      USER_CONFLICT: 'User already registered',
      USER_NOT_FOUND: 'User does not exist',
    };
  }

  getNotFound() {
    this.message = {
      ...this.message, 
      NOT_FOUND_IDS: '"categoryIds" not found',
      NOT_FOUND_POST: 'Post does not exist',
    };
  }

  getUnallowed() {
    this.message = {
      ...this.message,
      UNALLOWED_CONTENT: 'Categories cannot be edited',
    };
  }

  getMessages() {
    this.getInvalidMessages();
    this.getEmptyMessages();
    this.getRequiredMessages();
    this.getUserMessages();
    this.getNotFound();
    this.getUnallowed();
  }
}

module.exports = new ErrorMessage(MinimumCharacters.minChar);