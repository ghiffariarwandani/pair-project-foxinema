'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Movie extends Model{}
  Movie.init({
    seats: DataTypes.INTEGER,
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    image: DataTypes.STRING
  }, {
    sequelize
  })
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.hasMany(models.UserMovie)
    Movie.belongsToMany(models.User,{through: models.UserMovie})
  };
  return Movie;
};