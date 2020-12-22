const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

//Ajout des routes 

//Création d'un nouveau article du blog
router.get('/nouveau', (req, res) => {
    res.render('articles/nouveau', { article: new Article()})
})

//Affichage d'un article à partir de la BDD mongoDB par son l'Id
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if(article == null) res.redirect("/")
    res.render('articles/affiche', {article: article})
})

//Sauvegarde d'un article dans la BDD => titre, description, date création, et son markdown
router.post('/', async (req, res) => {
    let article = new Article({
        titre: req.body.titre,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        /* Sauvegarde de l'article dans la BDD mongoDB */
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        /* En cas d'erreur nous renvoie vers la page de création d'un nouveau article */
        console.log(e)
        res.render('articles/nouveau', { article: article})
    }
    
})


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

/* Export des routes */
module.exports = router 