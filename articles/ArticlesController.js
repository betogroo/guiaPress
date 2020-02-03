const express = require('express')
const router = express.Router()


router.get('/articles', (req, res) => {
    res.send('Rotas de Artigos')
})

router.get('/admin/articles/new', (req, res) => {
    res.send('Rota para criar novos artigoss')
})


module.exports = router

