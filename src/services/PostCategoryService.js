class PostCategoryService {
  constructor(model) {
    this.model = model;

    this.insertPostIds = this.insertPostIds.bind(this);
  }

  async insertPostIds(id, ids, t) {
    const postIds = ids.map((catId) => ({ postId: id, categoryId: Number(catId) }));

    await this.model.bulkCreate(postIds, t);
  }
}

module.exports = PostCategoryService;