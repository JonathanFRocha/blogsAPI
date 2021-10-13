const express = require('express');
const { 
  postController, 
  authMiddleware, 
  postMiddleware, 
  updatePostMiddleware, 
} = require('../config');

const postRoute = express.Router();

postRoute.use(authMiddleware.checkCredentials);

postRoute.post('/', postMiddleware.validatePost, postController.createPost);
postRoute.get('/', postController.listAllPosts);
postRoute.get('/search', postController.listAllPosts);
postRoute.get('/:id', postController.findById);
postRoute.put('/:id', updatePostMiddleware.validatePost, postController.updatePost);
postRoute.delete('/:id', postController.deletePost);

module.exports = postRoute;