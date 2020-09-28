const express = require('express')
const morgan = require('morgan')
const path = require('path')
const exphbs = require('express-handlebars')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const bodyParser = require('body-parser')

const { database } = require('./keys')

//Inicializaciones
const app = express()
require('./lib/passport')

//Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')//Establecemos hbs como motor de plantillas

//Middlewares.
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))//Permite aceptar datos desde el navegador siempre y cuando no sean imagenes o videos, solo acepta datos simples
app.use(bodyParser.json())//Aceptar JSON

app.use(session({
    secret:'nodesessionmysql',
    resave:false,
    saveUninitialized: false,
    store:new MySQLStore(database)//Con esto se almacenaran las sesiones en la bdd
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success')//Con esto hacemos disponible el mensaje en todas mis vistas
    app.locals.message = req.flash('message')//Con esto hacemos disponible el mensaje en todas mis vistas
    app.locals.user = req.user
    next()
})

//Routes
app.use(require('./routes'))//Agregamos las rutas
app.use(require('./routes/authentication'))//Rutas de autenticacion(registro de usuarios y login de usuarios)
app.use('/links',require('./routes/links'))//Utilizara el prefijo links siempre que se acceda a esta ruta '/links/add'


//Public
app.use(express.static(path.join(__dirname, 'public')))

//Starting the server
app.listen(app.get('port'), () => {
    console.log("Server start!")
})


