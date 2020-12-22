const mongoose = require('mongoose')
const marked = require ('marked')
const slugify = require ('slugify')

//Création du schema de l'artice dans la BDD mongoDB
const articleSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description :{
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now //Création automatique de la date et insértion dans la BDD
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

//validation de l'article avant la sauvegarde (obligatoire)

articleSchema.pre('validate', function(next) {
    if(this.titre) {    
    //Rendre le titre en miniscule
        this.slug = slugify(this.titre, { 
            lower: true,
            strict: true })
    }

    next()
})

//Slug: cette propriété est ajoutée ds le but de garder la même forme des articles
//ds la BDD. A chaque sauvegarde d'articles, le calcul avec slug se fera automatiquement ds la BDD.
//Slug remplace l'ID généré par MongoDB par le titre de l'article



//Exportation du modèle par mongoose
module.exports = mongoose.model('Article', articleSchema)