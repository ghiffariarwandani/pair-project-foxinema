const routes = require('express').Router()
const Controller = require('../controller/c_movie')
const helpers = require('../helpers/helpers')

routes.get('/',Controller.showMovie)
routes.get('/:id', Controller.detail)
routes.get('/:id/seats', helpers.middlewareLogin,Controller.showSeats)
routes.post('/:id/seats', Controller.buyTicket)

module.exports = routes