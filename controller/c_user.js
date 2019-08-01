const {
    User,
    UserMovie,
    Movie,
    Seat
} = require('../models')
const bcrypt = require('bcrypt')
class ControllerUser {
    static formLogin(req, res) {
        res.render('user/login')
    }

    static login(req, res) {
        User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(data => {
                if (data) {
                    if (bcrypt.compareSync(req.body.password, data.password)) {

                        req.session.UserId = data.id
                        req.session.name = data.name
                        req.session.balance = data.balance
                        req.session.email = data.email
                        res.redirect(`/user/${req.session.UserId}`)
                    } else {
                        res.send('gagal login')
                    }
                } else {
                    res.send('data ga ada woy')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static formRegister(req, res) {
        res.render('user/register')
    }

    static create(req, res) {
        if (req.body.password == req.body.password_confirm) {
            User.create(req.body)
                .then(() => {
                    helpers.nodemailer(req.body.email)
                    res.send('User berhasil dibuat')
                })
                .catch((err) => {
                    res.send(err)
                    console.log(err);
                })
        } else {
            res.send('password must be the same')
        }

    }

    static dashboardUser(req, res) {
        UserMovie.findAll({
                include: [{
                    model: User,
                    where: {
                        id: req.params.UserId
                    }
                }, {
                    model: Movie
                }]
            })
            .then(data => {
                //res.send(data)
                res.render('user/users', {
                    data: data,
                    seats: null
                })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static detilSeats(req, res) {
        Promise.all([
                UserMovie.findAll({
                    include: [{
                        model: User,
                        where: {
                            id: req.params.UserId
                        }
                    }, {
                        model: Movie
                    }]
                }),

                Seat.findAll({
                    where: {
                        UserMovieId: req.params.UserMovieId
                    }
                }),

                Movie.findByPk(req.params.MovieId)

            ])

            .then(data => {
                //res.send(data)
                let seats = data[1]
                let movie = data[2]
                let all = data[0]

                res.render('user/users', {
                    data: all,
                    seats: seats,
                    movie: movie
                })
                //res.send({data:all, seats:seats, movie:movie})

            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })

    }

    static destroyBooking(req, res) {
        Promise.all([
                Seat.findAll({
                    where: {
                        'UserMovieId': req.params.UserMovieId
                    }
                }),
                UserMovie.findByPk(req.params.UserMovieId)
            ])
            .then(data => {
                let numSeats = data[0].length
                let movieId = data[1].MovieId
                Movie.findByPk(movieId)
                    .then(mov => {
                        mov.updateSeats(numSeats)
                        return User.findByPk(req.params.UserId)
                    })
                    .then(user => {
                        let balance = numSeats * 40000
                        user.refundBalance(balance)
                    })
                    .catch(err => res.send(err))

            })
            .catch(err => {
                res.send(err)
            })

        UserMovie.findByPk(req.params.UserMovieId)
        Seat.destroy({
                where: {
                    'UserMovieId': req.params.UserMovieId
                }
            }).then(() => {
                return UserMovie.destroy({
                    where: {
                        id: req.params.UserMovieId
                    },
                    cascade: true
                })
            })
            .then(() => {
                redirect(`/user/${req.params.UserId}`)
            })
            .catch(err => {
                res.send(err)
            })

    }

}

module.exports = ControllerUser