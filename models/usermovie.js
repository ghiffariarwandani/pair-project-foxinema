'use strict';
const {
  Seat,
  User
} = require('./index')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class UserMovie extends Model {}
  UserMovie.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER
  }, {
    sequelize
  })

  UserMovie.associate = function (models) {
    // associations can be defined here
    UserMovie.hasMany(models.Seat, {
      onDelete: 'cascade',
      hooks: true,
      foreignKey: 'UserMovieId'
    })
    UserMovie.belongsTo(models.User)
    UserMovie.belongsTo(models.Movie)
  }

  return UserMovie;
};