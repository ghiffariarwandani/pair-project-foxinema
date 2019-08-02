const {
    Movie,
    DescMovie,
    UserMovie,
    User,
    Seat
} = require('../models/')
const axios = require('axios');

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
                const trailler = movie.title + 'trailler'
                return Promise.all([
                    movie,
                    // axios({
                    //     method: 'get',
                    //     url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${trailler}&type=video&maxResults=1&chart=mostPopular&key=AIzaSyBXgmC9VIwGq3HeOab8kE78XrnNjrCnDrc`,
                    // })
                ])
            })
            .then(created => {
                const mov = {
                    movieInfo: created[0].dataValues,
                    // youtube: created[1].data.items[0].id.videoId
                };
                res.render('movie/detail', {
                    mov,
                    // url: mov.youtube
                })
            })
            .catch(err => console.log(err))
    }

    static showSeats(req, res) {
        Movie.findByPk(req.params.id)
            .then(dataMovie => {
                let user = {
                    id: req.session.UserId,
                    name: req.session.name,
                }
                res.render('movie/seats', {
                    dataMovie,
                    user
                })
            })
            .catch(err => console.log(err))
    }

    static buyTicket(req, res) {
        User.findByPk(req.body.UserId)
            .then(user => {
                if (user.balance >= req.body.total_price) {
                    let isBalance = user.balance - req.body.total_price
                    req.session.balance = isBalance
                    return Promise.all(
                        [UserMovie.create({
                                id: null,
                                UserId: Number(req.body.UserId),
                                MovieId: Number(req.body.MovieId),
                            }),
                            User.update({
                                balance: isBalance
                            }, {
                                where: {
                                    id: req.body.UserId
                                }
                            })
                        ])
                } else {
                    throw new Error('uang gak cukup cui')
                }
            })
            .then((result) => {
                let seats = req.body.seat.split(',')
                let userMovie = Number(result[0].dataValues.id)
                res.redirect('/user')
                seats.forEach(el => {
                    Seat.create({
                        seatName: el,
                        UserMovieId: userMovie
                    })
                })
            })
            .catch(err => {
                res.send(err.messagge)
            })
    }

}

module.exports = ControllerMovie