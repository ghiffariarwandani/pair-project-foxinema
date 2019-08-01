const {
    Movie,
    DescMovie
} = require('../models/')

class ControllerMovie {

    static showMovie(req, res) {
        Movie.findAll({
                order: [
                    ['id', 'ASC']
                ]
            }, {
                include: {
                    model: DescMovie
                }
            })
            .then((movies) => {
                res.render('movie/movies', {
                    movies
                })
                // res.send(movies)
            })
            .catch(err => {
                console.log(err);
            })
    }

    static detail(req, res) {
        Movie.findByPk(req.params.id, {
                include: {
                    model: DescMovie
                }
            })
            .then(movie => {
                // res.send(movie)
                res.render('movie/detail', {
                    movie
                })
            })
            .catch(err => console.log(err))
    }

    static showSeats(req, res) {
        Movie.findByPk(req.params.id)
            .then(dataMovie => {
                res.render('movie/seats', {
                    dataMovie
                })
            })
            .catch(err => console.log(err))
    }

}

module.exports = ControllerMovie