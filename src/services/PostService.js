class PostService {
  constructor(
    { Post, User, Cat, h, postCategoryService, categoryService, authService, Constants, BaseError },
  ) {
    this.model = Post;
    this.userModel = User;
    this.categoryModel = Cat;

    this.postCategoryService = postCategoryService;
    this.categoryService = categoryService;
    this.authService = authService;
    
    this.statusCode = Constants.statusCode;
    this.errorMessage = Constants.errorMessage;
    this.ERROR = BaseError;
    this.helper = h;

    this.createPost = this.createPost.bind(this);
    this.verifyCategories = this.verifyCategories.bind(this);
    this.listPosts = this.listPosts.bind(this);
    this.findById = this.findById.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  async checkCredentials(postId, token) {
    const post = await this.findById(postId, {});
    const { id } = this.authService.decode(token);

    if (id !== post.userId) {
      throw new this.ERROR(this.errorMessage.INVALID_USER, this.statusCode.UNAUTHORIZED);
    }
  }

  getAssociation(type = 'all') {
    const associationModels = {
      user: { model: this.userModel, as: 'user' },
      categories: { model: this.categoryModel, as: 'categories', through: { attributes: [] } },
    };
     if (type === 'all') return [associationModels.user, associationModels.categories];
     return associationModels[type];
  }

  async verifyCategories(categoryIds) {
    const categoryList = await this.categoryService.findByCategories(categoryIds);
    if (categoryList.length !== categoryIds.length) {
      throw new this.ERROR(this.errorMessage.NOT_FOUND_IDS, this.statusCode.BAD_REQUEST);
    }
  }

  async findById(id, opts) {
    const config = opts || {
      include: this.getAssociation(),
    };

    const options = {
      where: { id },
      ...config,
    };

    const post = await this.model.findOne(options);

    if (!post) { 
      throw new this.ERROR(this.errorMessage.NOT_FOUND_POST, this.statusCode.NOT_FOUND);
    }
    return post;
  }

  async listPosts(query) {
    const posts = await this.model.findAll({
      include: this.getAssociation(),
    });
    if (query) {
      const filteredPosts = this.helper.filterBy(query, posts);
      return filteredPosts;
    } 
    return posts;
  }

  async createPost({ title, content, categoryIds, token }, t) {
    await this.verifyCategories(categoryIds);
    const { id } = this.authService.decode(token);
    const date = new Date();
    const data = { title, content, userId: id, published: date, updated: date };
    
    const result = await this.model.create(data, t);
    await this.postCategoryService.insertPostIds(result.id, categoryIds, t);
    
    return { id: result.id, userId: result.userId, title: result.title, content: result.content };
  }

  async updatePost({ title, content }, postId, token) {
    await this.checkCredentials(postId, token);
    await this.model.update(
      { title, content },
      { where: { id: postId } },
    );

    const result = await this.findById(postId, {
      include: this.getAssociation('categories'),
      attributes: { exclude: ['published', 'updated'] },
    });

    return result;
  }

  async deletePost(postId, token) {
    await this.checkCredentials(postId, token);
    await this.model.destroy(
      { where: { id: postId } },
    );
  }
}

module.exports = PostService;