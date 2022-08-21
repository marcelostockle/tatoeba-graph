const Sentence = require('../models/sentence')

const getSentence = async (req, res) => {
    query_result = await Sentence.findById(req.params.sid)
    res.status(200).json(query_result)
}

module.exports = {
    getSentence
}