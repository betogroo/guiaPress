const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3000
const connection = require('./database/database')


const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
const userController = require('./user/UserController')

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
app.use('/', userController)

// Rotas
app.get('/', (req, res) => {
    
    Article.findAll({
        order: [['id', 'DESC']],
        limit: 4
    }).then(articles=>{
        Category.findAll().then(categories=>{
            res.render('index', {
                articles: articles,
                categories: categories
            })
        })
        
    })
    
})

app.get('/article/:slug', (req, res)=>{
    var slug = req.params.slug
    Article.findOne(
        {where: {
            slug: slug
        }}
    ).then(
        article =>{
            Category.findAll().then(categories=>{
                if (article != undefined) {
                    res.render('article', {
                        article: article,
                        categories, categories
                    })
                } else {
                    res.redirect('/')
                }
            })
            
        }
    ).catch()
})

app.get('/categories', (req, res) => {
    Category.findAll().then(categories=>{
        res.render('categories', {categories: categories})
    })
})

app.get('/category/:slug', (req, res)=>{
    var slug = req.params.slug
        Article.findAll({
            include: Category,
            where: {
                '$category.slug$': slug
            }
            
        }).then(articles=>{
            
            res.render('category', {
                articles: articles
            })
        })
})








app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:' + PORT)
})


