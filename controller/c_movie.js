const {Movie} = require('../models/')
class ControllerMovie{
    static showMovie(req,res){
        Movie.findAll({
            order : [['id','ASC']]
        })
        .then((data)=>{
            res.send(data)
        })
        .catch(err=>{
            res.send(err)
        })
    }

}

module.exports = ControllerMovie