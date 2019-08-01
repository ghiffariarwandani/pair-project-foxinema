const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');
const express = require('express')
const session = require('express-session');
const nodemailer = require('nodemailer');
const app = express()
// const flash = require('flash-express')
// app.use(flash());
const {
    Movie,
    User,
} = require('./routes')
app.use(express.urlencoded({
    extended: false
}))
app.set('view engine', 'ejs')
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 999999999999999999999999999999999
    }
}))
app.use(flash(app));


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