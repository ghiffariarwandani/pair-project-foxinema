'use strict';
const fs = require('fs')
let seedingMovie = JSON.parse(fs.readFileSync('seed_desc_movie.json', 'utf8'))
seedingMovie.forEach((e) => {
  e.createdAt = new Date()
  e.updatedAt = new Date()
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('DescMovies', seedingMovie, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('DescMovies', null, {});
  }
};