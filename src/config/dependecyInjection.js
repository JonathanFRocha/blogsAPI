const jsonWebToken = require('jsonwebtoken');
const Sequelize = require('sequelize');
const config = require('../sequelize/config/config');
const { Constants } = require('../constants');
const { User, Category, BlogPost, PostsCategory } = require('../models');
const { 
  UserController, 
  LoginController, 
  CategoryController, 
  PostController, 
} = require('../controllers');
const { 
  UserService, 
  AuthService,
   LoginService, 
   CategoryService, 
   PostService, 
   PostCategoryService,
} = require('../services');

const { JoiValidation, BaseError, Jwt, FilterObject } = require('../utils');
const { 
  UserMiddleware, 
  LoginMiddleware, 
  AuthMiddleware, 
  CategoryMiddleware, 
  PostMiddleware,
} = require('../middleware');

const sequelize = new Sequelize(config.development);

const authService = new 
  AuthService({ 
    jwt: jsonWebToken, 
    jwtConfig: Jwt.config, 
    secret: process.env.JWT_SECRET, 
    constants: Constants, 
    errorHandler: BaseError, 
  });

const userMiddleware = new UserMiddleware(JoiValidation.userSchema, Constants, BaseError);
const loginMiddleware = new LoginMiddleware(JoiValidation.loginSchema, Constants, BaseError);
const authMiddleware = new AuthMiddleware(authService, Constants);
const categoryMiddleware = new 
  CategoryMiddleware(JoiValidation.categorySchema, Constants, BaseError);
const postMiddleware = new PostMiddleware(JoiValidation.postSchema, Constants, BaseError);
const updatePostMiddleware = new 
  PostMiddleware(JoiValidation.updatePostSchema, Constants, BaseError);

const userService = new UserService(User, authService, Constants, BaseError);
const loginService = new LoginService(User, authService, Constants);
const categoryService = new CategoryService(Category, authService);
const postCategoryService = new PostCategoryService(PostsCategory);
const postService = new PostService({ 
  Post: BlogPost, 
  User,
  Cat: Category,
  h: FilterObject,
  postCategoryService,
  categoryService,
  authService,
  Constants,
  BaseError,
});

const userController = new UserController(userService, Constants);
const loginController = new LoginController(loginService, Constants);
const categoryController = new CategoryController(categoryService, Constants);
const postController = new PostController(postService, Constants, sequelize);

module.exports = { 
  userController, 
  loginController, 
  categoryController,
  postController,
  userMiddleware, 
  loginMiddleware,
  authMiddleware,
  categoryMiddleware,
  postMiddleware,
  updatePostMiddleware,
};