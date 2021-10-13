const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'BlogPosts' });
    }
  }
  User.init({
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};