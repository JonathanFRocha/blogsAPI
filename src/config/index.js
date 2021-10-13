const {
  userController,
  userMiddleware,
  loginController, 
  loginMiddleware, 
  authMiddleware,
  categoryController,
  categoryMiddleware,
  postController,
  postMiddleware,
  updatePostMiddleware,
} = require('./dependecyInjection');

module.exports = { 
  userController, 
  userMiddleware, 
  loginController,
  loginMiddleware,
  authMiddleware, 
  categoryController,
  categoryMiddleware,
  postController,
  postMiddleware,
  updatePostMiddleware,
};