const express = require('express')
const app = express()
const {Movie, Seat, User, UserMovie} = require('./routes')
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.listen(3000,()=>{
    console.log('listening to port 3000');
})

app.get('/', (req,res)=>{
    res.send('Halaman Home')
})

app.use('/cinema', Movie)
app.use('/user',User)