const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(_models) {

    }
  }
  Category.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'Categories',
    timestamps: false,
  });
  return Category;
};