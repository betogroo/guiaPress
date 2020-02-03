const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3000
const connection = require('./database/database')


const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')

//View Engine (EJS)
app.set('view engine', 'ejs')

// Static Files
app.use(express.static('public'))


//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conectado com sucesso!')
    })
    .catch((error) => {
        console.log('Erro ao conectar' + error)
    })


app.use('/', categoriesController)
app.use('/', articlesController)

// Rotas
app.get('/', (req, res) => {
    res.render('index')
})







app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:' + PORT)
})


