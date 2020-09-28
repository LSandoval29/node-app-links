//Módulo de autenticacion de usuarios:
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//Importamos la conexion a la base de datos
const pool = require('../database')
const helpers = require('../lib/helpers')

//Login de usuarios
passport.use('local.signin', new LocalStrategy({
    usernameField:'username',
    passwordField: 'password',
    passReqToCallback: true
}, async( req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?',[username])//Hacemos la consulta para ver si existe el usuario 
    if(rows.length>0){//Si encontro un usuario entra al if
        const user = rows[0]
        console.log(user)
        const validPassword = await helpers.matchPassword(password, user.password)//Comparamos que ambas contraseñas sean iguales
        console.log(validPassword)
        if(validPassword){//Si esto es true entra al if
            done(null, user, req.flash('success','¡Bienvenido!' + user.username))
        }else{//Si es false
            done(null, false, req.flash('message','¡Contraseña incorrecta!'))
        }
    }else{//Si no encontro ningun usuario registrado en la bdd
        return done(null, false, req.flash('message','¡El usuario no existe, porfavor registrate!'))
    }

}))

//Registro de usuarios
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',//Indicamos desde que campo del formulario recibiremos el username
    passwordField: 'password',//Indicamos desde que campo del formulario recibiremos el password
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body
    const newUser = {
        username:username,
        password:password,
        fullname:fullname
    };
    newUser.password = await helpers.encryptPassword(password)//Ciframos la contraseña que llega desde el formulario
    const result = await pool.query('INSERT INTO users SET ?',[newUser])
    newUser.id= result.insertId//Pasamos el id del usuario al nuevo usuario creado
    return done(null, newUser)//retornamos done para finalizar y que continue con el newUser

}))

//Definimos la parte para serializar al usuario
passport.serializeUser((user, done) => {//Método para guardar al usuario en una sesion
    done(null, user.id)
})

//Deserealizamos al usuario
passport.deserializeUser(async (id,done) => {

    const rows = await pool.query('SELECT * FROM users WHERE id = ?',[id])//Buscamos en la bdd el usuario con el id en sesion
    done(null, rows[0])

})
