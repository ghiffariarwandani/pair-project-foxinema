const fs = require('fs')
let seedingMovie = JSON.parse(fs.readFileSync('./seed_dummy_movies.json','utf8'))
seedingMovie.forEach((e)=>{
    e.createdAt = new Date()
    e.updatedAt = new Date()
})
console.log(seedingMovie);
