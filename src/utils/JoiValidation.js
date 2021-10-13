const Joi = require('joi');

const { Constants } = require('../constants');

class JoiValidation {
  static userSchema() {
    return Joi.object({
      displayName: Joi.string().min(Constants.DISPLAY_NAME_MIN_CHARACTERS).required(),
      email: Joi.string().regex(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/i).required(),
      password: Joi.string().min(Constants.PASSWORD_MIN_CHARACTERS).required(),
      image: Joi.optional(),
    });
  }

  static loginSchema() {
    return Joi.object({
      email: Joi.string().regex(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/i).required().empty(),
      password: Joi.string().min(Constants.PASSWORD_MIN_CHARACTERS).required().empty(),
    });
  }

  static categorySchema() {
    return Joi.object({
      name: Joi.string().required().empty(),
    });
  }

  static postSchema() {
     return Joi.object({
       title: Joi.string().required().empty(),
       content: Joi.string().required(),
       categoryIds: Joi.array().required(),
     });
  }

  static updatePostSchema() {
    return Joi.object({
      title: Joi.string().required().empty(),
      content: Joi.string().required(),
    });
 }
}

module.exports = JoiValidation;