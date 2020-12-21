const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description :{
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Article', articleSchema)