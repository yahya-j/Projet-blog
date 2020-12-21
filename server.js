const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

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
    res.render('index', { articles: articles })
})





app.listen(5000)