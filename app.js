const express = require('express')
const app = express()
const session = require('express-session')
const {
    Movie,
    User,
} = require('./routes')
app.use(express.urlencoded({
    extended: false
}))
app.set('view engine', 'ejs')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge : 999999999999999999 }
  }))


app.locals.helpers = require('./helpers/helpers')
app.use((req,res,next)=>{
    app.locals.session = req.session
    next()
})



app.get('/', (req, res) => {
    res.render('home')
})
app.use('/movie', Movie)
app.use('/user', User)

app.listen(3000, () => {
    console.log('listening to port 3000');
})