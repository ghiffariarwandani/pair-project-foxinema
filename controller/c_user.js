const {User,UserMovie,Movie, Seat} = require('../models')
class ControllerUser{
    static formLogin(req,res){
        res.render('user/login')
    }

    static formRegister(req,res){
        res.render('user/register')
    }

    static create(req,res){
        if(req.body.password == req.body.password_confirm){
            User.create(req.body)
            .then(()=>{
                res.send('User berhasil dibuat')
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.send('password must be the same')
        }

    }

    static dashboardUser(req,res){
        UserMovie.findAll({
            include : [{
                model : User,
                where : {
                    id : req.params.id
                } 
            },{
                model : Movie
            }   ]
        })
        .then(data=>{
            //res.send(data)
            res.render('user/users',{data:data, seats:null})
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    }

    static detilSeats(req,res){
        Promise.all([
            UserMovie.findAll({
                include : [{
                    model : User,
                    where : {
                        id : req.params.UserId
                    } 
                },{
                    model : Movie
                }   ]
            }),

            Seat.findAll({
                where :{
                    UserMovieId : req.params.UserMovieId
                }
            }),

            Movie.findByPk(req.params.MovieId)

        ])

        .then(data=>{
            //res.send(data)
            let seats = data[1]
            let movie = data[2]
            let all = data[0]
 
            res.render('user/users',{data:all, seats:seats, movie:movie})
            //res.send({data:all, seats:seats, movie:movie})

        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })

    }

    static destroyBooking(req,res){
        Seat.destroy({
            where:{
                'UserMovieId': req.params.UserMovieId
            }
        }).then(() => {
            return UserMovie.destroy({
                where : {
                    id : req.params.UserMovieId
                },
                cascade: true
            })
            
        })
        .then(()=>{
            redirect(`/user/${req.params.UserId}`)
        })
        .catch(err=>{
            res.send(err)
        })
        
    }

}

module.exports = ControllerUser