class PostController {
  constructor(service, constants, sequelize) {
    const { statusCode, errorMessage } = constants;
      this.service = service;
      this.sequelize = sequelize;
      this.statusCode = statusCode;
      this.errorMessage = errorMessage;

      this.createPost = this.createPost.bind(this);
      this.listAllPosts = this.listAllPosts.bind(this);
      this.findById = this.findById.bind(this);
      this.updatePost = this.updatePost.bind(this);
      this.deletePost = this.deletePost.bind(this);
  }

  async createPost(req, res) {
    const t = await this.sequelize.transaction();
    
    try {
      const { title, categoryIds, content } = req.body;
      const token = req.headers.authorization;
      const payload = { title, content, categoryIds, token };
      const transaction = { transaction: t };

      const result = await this.service.createPost(payload, transaction);

      t.commit();
      res.status(this.statusCode.CREATED).json(result);
    } catch (error) {
      t.rollback();
      res.status(
        error.statusCode || this.statusCode.SERVER_ERROR,
        ).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.findById(id);
      res.status(this.statusCode.OK).json(result);
    } catch (error) {
      res.status(error.statusCode || this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  }

  async listAllPosts(req, res) {
    try {
      const query = req.query.q;
      const list = await this.service.listPosts(query);
      res.status(this.statusCode.OK).json(list);
    } catch (error) {
      res.status(error.statusCode || this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  } 

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const token = req.headers.authorization;
      const { title, content } = req.body;
      const result = await this.service.updatePost({ title, content }, id, token);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.statusCode || this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const token = req.headers.authorization;
      await this.service.deletePost(id, token);
      res.status(this.statusCode.DELETED).json();
    } catch (error) {
      res.status(error.statusCode || this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  }
}

module.exports = PostController;