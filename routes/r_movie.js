const routes = require('express').Router()
const Controller = require('../controller/c_movie')

routes.get('/',Controller.showMovie)
routes.get('/:id', Controller.detail)
routes.get('/:id/seats', Controller.showSeats)

module.exports = routes