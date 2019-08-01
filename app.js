const express = require('express')
const session = require('express-session');
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
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.set('view engine', 'ejs')
app.locals.helpers = require('./helpers/helpers')

app.get('/', (req, res) => {
    res.render('home')
})
app.use('/movie', Movie)
app.use('/user', User)
app.get('/cinema', (req, res) => {
    res.render('cinema/cinema')
})

app.listen(3000, () => {
    console.log('listening to port 3000');
})