const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

//Ajout des routes 

//Création d'un nouveau article du blog
router.get('/nouveau', (req, res) => {
    res.render('articles/nouveau', { article: new Article()})
})

router.get('/edition/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edition', { article: article })
})

//Affichage d'un article à partir de la BDD mongoDB par son l'Id
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if(article == null) res.redirect("/")
    res.render('articles/affiche', {article: article})
})

//Sauvegarde d'un article dans la BDD => titre, description, date création, et son markdown
router.post('/', async (req, res, next) => {
        req.article = new Article()
        
        next()
}, saveArticleEtRedirection('nouveau'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleEtRedirection('edition'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleEtRedirection(path) {
    return  async (req, res) => {
        let article = req.article
            article.titre = req.body.titre
            article.description = req.body.description
            article.markdown =  req.body.markdown
        
        try {
            /* Sauvegarde de l'article dans la BDD mongoDB */
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            /* En cas d'erreur nous renvoie vers la page de création d'un nouveau article */
            res.render(`articles/${path}`, { article: article})
        }
    }
}

/* Export des routes */
module.exports = router 