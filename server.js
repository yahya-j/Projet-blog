const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', { 
    useNewUrlParser: true, useUnifiedTopology: true
})


app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res) => {
    const articles = [{
        titre: 'Test Article',
        dateCreation: new Date(),
        description: 'Test description'
    },
    {
        titre: 'Test Article2',
        dateCreation: new Date(),
        description: 'Test description2'
    },
]
    res.render('articles/index', { articles: articles })
})





app.listen(5000)