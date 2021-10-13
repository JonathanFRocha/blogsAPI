const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    static associate(models) {
      BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  BlogPost.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    sequelize,
    tableName: 'BlogPosts',
    timestamps: false,
  });
  return BlogPost;
};