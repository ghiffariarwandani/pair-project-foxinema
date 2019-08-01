const {
    User,
    UserMovie,
    Movie,
    Seat
} = require('../models')
const helpers = require('../helpers/helpers')
const bcrypt = require('bcrypt')
class ControllerUser {
    static formLogin(req, res) {
        res.render('user/login', {success: req.flash('info')})
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
                        req.flash('info', `welcome ${data.name}`)
                        res.redirect(`/user`)
                    } else {
                        throw new Error('wrong password/username')
                    }
                }
            })
            .catch(err => {
                req.flash('err', `${err.message}`)
                res.redirect('/user/login')
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
                    res.redirect('/user/login')
                })
                .catch((err) => {
                    res.send(err)
                    console.log(err);
                })
        } else {
            req.flash('password must be the same')
        }

    }

    static dashboardUser(req, res) {
        UserMovie.findAll({
                include: [{
                    model: User,
                    where: {
                        id: req.session.UserId
                    }
                }, {
                    model: Movie
                }]
            })
            .then(data => {
                res.render('user/dashboard', {
                    data: data,
                    seats: null,
                    session: req.session
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
                            id: req.session.UserId
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
                let seats = data[1]
                let movie = data[2]
                let all = data[0]

                res.render('user/dashboard', {
                    data: all,
                    seats: seats,
                    movie: movie,
                    session: req.session
                })

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
                        return User.findByPk(req.session.UserId)
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
                        res.redirect(`/user`)
                    })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }

}

module.exports = ControllerUser