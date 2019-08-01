const routes = require('express').Router()
const Controller = require('../controller/c_user')
const helper = require('../helpers/helpers')

routes.get('/login',Controller.formLogin)
routes.post('/login',Controller.login)
routes.get('/register',Controller.formRegister)
routes.post('/register',Controller.create)
routes.get('/detailBooking/:UserMovieId/:MovieId/:UserId', helper.middlewareLogin,Controller.detilSeats)
routes.get('/cancelBooking/:UserMovieId/:UserId', helper.middlewareLogin,Controller.destroyBooking)
routes.get('/:UserId',helper.middlewareLogin,Controller.dashboardUser)


module.exports = routes