'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Seat extends Model {}
  Seat.init({
    seatName: DataTypes.STRING,
    UserMovieId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    }
  }, {
    sequelize
  })
  Seat.associate = function (models) {
    // associations can be defined here
    Seat.belongsTo(models.UserMovie)
  };
  return Seat;
};