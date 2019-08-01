const session = require('express-session')

module.exports = {
    convertDate: function (date) {
        return date.toDateString()
    },

    middlewareLogin: function(req,res,next){
        if(req.session.email){
            next()
        }else{
            res.redirect('/')
        }
      
    }
}