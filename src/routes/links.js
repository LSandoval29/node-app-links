//Rutas de links:
const express = require('express')
const router = express.Router()

const pool = require('../database')//Se hace referencia ala base de datos

//Ruta que muestra el formulario de agregar links
router.get('/add', (req, res) => {
    res.render('links/add')//Renderizamos la vista para agregar un link.
})

//Ruta para agregar links
router.post('/add', async (req, res) => {
    const { title, url, description } = req.body //Decidimos los valores que queremos usar
    const newLink = {
        title,
        url,
        description
    }
    await pool.query('INSERT INTO links SET ?', [newLink])//Insercion usando pool de manera asincrona.
    req.flash('success', 'Link agregado correctamente.')//Llamamos desde req al metodo flash para pintar mensajes de exito o de error
    res.redirect('/links')//Redireccionamos a la ruta links
})

//Ruta para listar los links
router.get('/', async (req, res ) => {
    const links = await pool.query('SELECT * FROM links')
    res.render('links/list', {links})
})

//Ruta para eliminar links
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params//Guardamos el id que viene desde el formulario del navegador
    await pool.query('DELETE FROM links WHERE id = ?', [id])//Se hace el eliminado usando pool
    req.flash('success', 'Link eliminado correctamente.')//Llamamos desde req al metodo flash para pintar mensajes de exito o de error
    res.redirect('/links')//Redireccionamos a la ruta de links despues de borrar
})

//Ruta para mostrar el formulario de editar
router.get('/edit/:id', async (req, res) => {
    const {id} = req.params
    const link = await pool.query('SELECT * FROM links WHERE id = ?',[id])
    res.render('links/edit', {link: link[0] })//Renderizamos la vista para editar un link.
})

//Ruta para actualizar los datos enviados desde el formulario
router.post('/edit/:id', async (req, res) =>{
    const {id} = req.params//Guardamos el id que viene desde el formulario del navegador
    const {title, url, description} = req.body
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE links set ? WHERE id = ?',[newLink, id])//Se hace la actualizacion en la base de datos 
    req.flash('success', 'Link actualizado correctamente.')//Llamamos desde req al metodo flash para pintar mensajes de exito o de error
    res.redirect('/links')

})

module.exports = router