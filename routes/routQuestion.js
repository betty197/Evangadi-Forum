const express = require('express');
const router = express.Router();

const { question } = require('../Conteroller/questionController');

router.post('/', question)

module.exports = router;