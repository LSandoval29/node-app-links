module.exports = {

    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){//Si existe una sesion entra al if
            return next()//Si esta logueado el usuario continua ejecutandose todo 
        }else{//Si no esta logueado lo mandamos al login
            return res.redirect('/signin')
        }
    },

    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){//Si NO existe una sesion entra al if
            return next()//Si NO esta logueado el usuario continua ejecutandose todo 
        }else{//Si esta logueado lo mandamos al profile
            return res.redirect('/profile')
        }
    }


}