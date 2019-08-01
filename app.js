const express = require('express')
const app = express()
const {
    Movie,
    Seat,
    User,
    UserMovie
} = require('./routes')
app.use(express.urlencoded({
    extended: false
}))
app.set('view engine', 'ejs')
app.locals.helpers = require('./helpers/helpers')

app.get('/', (req, res) => {
    res.render('home')
})
app.use('/movie', Movie)
app.use('/user', User)

app.listen(3000, () => {
    console.log('listening to port 3000');
})