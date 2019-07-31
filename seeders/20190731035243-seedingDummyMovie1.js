'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    let seedingMovie = JSON.parse(fs.readFileSync('./seed_dummy_movies.json','utf8'))
    seedingMovie.forEach((e)=>{
        e.createdAt = new Date()
        e.updatedAt = new Date()
    })
    return queryInterface.bulkInsert("Movies",seedingMovie,{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Movies', null, {});  
  }
};
