'use strict';
module.exports = (sequelize, DataTypes) => {
  const DescMovie = sequelize.define('DescMovie', {
    director: DataTypes.STRING,
    starring: DataTypes.STRING,
    genre: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  DescMovie.associate = function(models) {
    DescMovie.belongsTo(models.Movie)
  };
  return DescMovie;
};