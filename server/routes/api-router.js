const express = require('express')
const router = express.Router()

const { getSentence } = require('../controllers/sentence')

router.route('/').get(getSentence)
router.route('/:sid').get(getSentence)

module.exports = router