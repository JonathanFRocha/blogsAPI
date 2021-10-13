const AuthMiddleware = require('./AuthMiddleware');
const CategoryMiddleware = require('./CategoryMiddleware');
const ErrorMiddleware = require('./ErrorMiddleware');
const LoginMiddleware = require('./LoginMiddleware');
const PostMiddleware = require('./PostMiddleware');
const UserMiddleware = require('./UserMiddleware');

module.exports = {
  ErrorMiddleware,
  UserMiddleware,
  LoginMiddleware,
  AuthMiddleware,
  CategoryMiddleware,
  PostMiddleware,
};
