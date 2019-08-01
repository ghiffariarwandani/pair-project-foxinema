const routes = require('express').Router()
const Controller = require('../controller/c_user')


routes.get('/login',Controller.formLogin)
routes.get('/register',Controller.formRegister)
routes.post('/register',Controller.create)
routes.get('/detailBooking/:UserMovieId/:MovieId/:UserId',Controller.detilSeats)
routes.get('/cancelBooking/:UserMovieId/:UserId',Controller.destroyBooking)
routes.get('/:id',Controller.dashboardUser)


module.exports = routes