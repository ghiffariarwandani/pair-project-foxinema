const routes = require('express').Router()
const Controller = require('../controller/c_movie')

routes.get('/',Controller.showMovie)

module.exports = routes