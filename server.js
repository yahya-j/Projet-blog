const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()


var db = mongoose.connect('mongodb://localhost/blog', { 
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true
})

//affiche la somme des articles de la BDD dans la console
Article.countDocuments({}, function(err, docCount) {
    if (err) { return handleError(err) } 
    console.log("docCount: " + docCount)
   
})

 
//appel de la librairie EJS pour la partie affichage côté serveur
app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: false
}))

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ dateCreation: 'desc'})

//routage vers la page de la liste des articles
  res.render('articles/index', { articles: articles })
})


app.use('/articles', articleRouter)


app.listen(5000)