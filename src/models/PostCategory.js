const { Model } = require('sequelize');

class PostsCategory extends Model {
  static associate(models) {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }
}

module.exports = (sequelize, _DataTypes) => {
  PostsCategory.init({}, {
    sequelize,
    timestamps: false,
  });
  return PostsCategory;
};