const express = require('express')
const router = express.Router()
const slugify = require('slugify')

const Category = require('../categories/Category')
const Article = require('../articles/Article')


router.get('/articles', (req, res) => {
    res.send('Rotas de Artigos')
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories=>{
        res.render('admin/articles/new', {categories: categories})
    })
    
    
})

router.post('/articles/save', (req, res) => {
    var title = req.body.title
    var body = req.body.body
    var slug = slugify(title, {lower: true})
    var category = req.body.category
    if (title != undefined && body != undefined) {
        Article.create({
            title: title,
            slug: slug,
            body: body,
            idCategory: category
        }).then(()=>{
            res.redirect('/admin/articles')
        })
    } else {
        res.redirect('/admin/article/new')
    }
})

router.get('/admin/articles', (req, res)=>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles =>{
        res.render('admin/articles/index', {articles: articles})
    })
    })


module.exports = router

