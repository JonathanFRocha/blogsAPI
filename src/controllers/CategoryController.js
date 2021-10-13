class CategoryController {
  constructor(service, constants) {
    const { statusCode, errorMessage } = constants;
      this.service = service;
      this.statusCode = statusCode;
      this.errorMessage = errorMessage;

      this.createCategory = this.createCategory.bind(this);
      this.listCategories = this.listCategories.bind(this);
  }

  async createCategory(req, res) {
    try {
      const { name } = req.body;
      const result = await this.service.createCategory(name);
      res.status(this.statusCode.CREATED).json(result);
    } catch (error) {
      res.status(this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  }

  async listCategories(_req, res) {
    try {
      const result = await this.service.listCategories();
      res.status(this.statusCode.OK).json(result);
    } catch (error) {
      res.status(this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  }
}

module.exports = CategoryController;