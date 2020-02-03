const express = require('express')
const router = express.Router()


router.get('/categories', (req, res) => {
    res.send('Rotas de Categorias')
})

router.get('/admin/categories/new', (req, res) => {
    res.send('Rota para criar novas categorias')
})


module.exports = router

