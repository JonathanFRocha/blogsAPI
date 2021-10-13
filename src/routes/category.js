const express = require('express');
const { categoryController, authMiddleware, categoryMiddleware } = require('../config');

const categoryRoute = express.Router();

categoryRoute.use(authMiddleware.checkCredentials);

categoryRoute.get('/', categoryController.listCategories);
categoryRoute.post('/', categoryMiddleware.validateCategory, categoryController.createCategory);

module.exports = categoryRoute;