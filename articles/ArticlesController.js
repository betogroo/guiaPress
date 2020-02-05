const express = require('express')
const router = express.Router()
const slugify = require('slugify')

const Category = require('../categories/Category')
const Article = require('../articles/Article')
const { Op } = require("sequelize") // Necessário para filtros where. 


router.get('/articles', (req, res) => {
    res.send('Rotas de Artigos')
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', { categories: categories })
    })


})

router.post('/articles/save', (req, res) => {
    var title = req.body.title
    var body = req.body.body
    var slug = slugify(title, { lower: true })
    var category = req.body.category
    if (title != undefined && body != undefined) {
        Article.create({
            title: title,
            slug: slug,
            body: body,
            idCategory: category
        }).then(() => {
            res.redirect('/admin/articles')
        })
    } else {
        res.redirect('/admin/article/new')
    }
})

router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render('admin/articles/index', {
            articles: articles
        })

    })
})

router.post('/articles/delete', (req, res) => {
    var id = req.body.id

    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: { id: id }
            }).then(() => {

                res.redirect('/admin/articles')
            })
        } else {

            res.redirect('/admin/articles')

        }
    } else {
        res.redirect('/admin/articles')
    }
})

router.get('/admin/articles/edit/:id', (req, res) => {
    var id = req.params.id
    Article.findOne({
        where: { id: id },
        include: Category
    }).then(article => {
        Category.findAll({
            where: {
                id: {
                    [Op.ne]: article.idCategory
                }
            },
            order: [
                ['title']
            ]
        }).then(categories => {
            res.render('admin/articles/edit', { article: article, categories, categories })
        })
    })


})

router.post('/articles/update', (req, res)=>{
    var id = req.body.id
    var title = req.body.title
    var slug = slugify(title, {lower: true})
    var body = req.body.body
    var idCategory = req.body.idCategory
    Article.update({
        title: title,
        slug: slug,
        body: body,
        idCategory: idCategory
    },
        {where:
        { id: id}
    }).then(()=>{
    res.redirect('/admin/articles')
    })
})



module.exports = router



