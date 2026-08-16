const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

const { question } = require('../Conteroller/questionController');

router.post('/', question)
router.get('/all-questions', authMiddleware, (req, res) => {
    res.send("all questions")
})

module.exports = router;