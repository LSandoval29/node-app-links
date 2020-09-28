const express = require('express')
const router = express.Router()

const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')


//Ruta para mostrar el formulario de registro
router.get('/registro', isNotLoggedIn, (req, res) => {
    res.render('auth/registro')
})

//Ruta para agregar un usuario
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup',{
    successRedirect: '/profile',//Si todo sale bien lo redireccionas a esta vista
    failureRedirect: '/signup',//Si hay errores se redirecciona a la vista signUp
    failureFlash: true//Sirve para enviar mensajes de exito o error usando flash
}))

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin')
})

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',//Si todo sale bien lo redireccionas a esta vista
        failureRedirect: '/signin',//Si hay errores se redirecciona a la vista signUp
        failureFlash: true//Sirve para enviar mensajes de exito o error usando flash
    })(req, res, next)
})

router.get('/profile', isLoggedIn, (req, res) => {//ISLOGGEDIN protegera la ruta y no se tendra acceso si no esta logueado
    res.render('profile')
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut()
    res.redirect('/signin')
})

module.exports = router