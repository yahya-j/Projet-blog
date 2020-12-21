const express = require('express')
const router = express.Router()

//Ajout des routes 
router.get('/test', (req, res) => {
    res.send('Dans les articles')
})


module.exports = router 