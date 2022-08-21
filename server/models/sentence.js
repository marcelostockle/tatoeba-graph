const mongoose = require('mongoose')

const sentenceSchema = new mongoose.Schema({
    _id: {
        type: Number
    }, lang: {
        type: String
    }, content: {
        type: String
    }, links: {
        type: [Number]
    }
})

module.exports = mongoose.model('Sentence', sentenceSchema)