const express = require('express')
const session = require('express-session');
const nodemailer = require('nodemailer');
const app = express()
const {
    Movie,
    User,
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

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 999999999999999999999999999999999
    }
}))


app.locals.helpers = require('./helpers/helpers')
app.use((req, res, next) => {
    app.locals.session = req.session
    next()
})



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