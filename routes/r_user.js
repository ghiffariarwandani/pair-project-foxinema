const routes = require('express').Router()
const Controller = require('../controller/c_user')
const helper = require('../helpers/helpers')

routes.get('/login',Controller.formLogin)
routes.post('/login',Controller.login)
routes.get('/register',Controller.formRegister)
routes.post('/register',Controller.create)
routes.get('/detailBooking/:UserMovieId/:MovieId/', helper.middlewareLogin,Controller.detilSeats)
routes.get('/cancelBooking/:UserMovieId/', helper.middlewareLogin,Controller.destroyBooking)
routes.get('/',helper.middlewareLogin,Controller.dashboardUser)
routes.get('/logout',Controller.logout)
routes.get('/:id/topup', Controller.formtopup)
routes.post('/:id/topup', Controller.topup)


module.exports = routes