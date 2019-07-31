'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER
  },{
    sequelize
  })
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Movie, {through : models.UserMovie })
  };
  return User;
};