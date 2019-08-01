'use strict';
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    name: DataTypes.STRING,
    balance: {
      type : DataTypes.INTEGER,
      defaultValue : 40000
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING
  },{
    sequelize
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.UserMovie)
    User.belongsToMany(models.Movie, {through : models.UserMovie })
  };
  User.addHook('beforeCreate',(user,option)=>{
      const saltRounds = 10 
      user.password = bcrypt.hashSync(user.password,saltRounds)
  })
  return User;
};