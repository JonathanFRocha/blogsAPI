const express = require('express');
const { loginController, loginMiddleware } = require('../config');

const loginRoute = express.Router();

loginRoute.post('/', loginMiddleware.validateLogin, loginController.login);

module.exports = loginRoute;