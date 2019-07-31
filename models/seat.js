'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Seat extends Model{}
  Seat.init({
    seatName: DataTypes.STRING,
    UserMovieId: DataTypes.INTEGER
  },{
    sequelize
  })
  Seat.associate = function(models) {
    // associations can be defined here
    Seat.belongsTo(models.UserMovie)
  };
  return Seat;
};