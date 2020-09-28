const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')//Renderizamos la vista index.
})

module.exports = router