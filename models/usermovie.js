'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class UserMovie extends Model{}
  UserMovie.init({
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER
  },{
    sequelize
  })
  UserMovie.associate = function(models) {
    // associations can be defined here
    UserMovie.hasMany(models.Seat)
  };
  return UserMovie;
};