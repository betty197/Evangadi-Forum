const express = require('express');
const router = express.Router();

const { answer } = require('../Conteroller/answerController');

router.post('/', answer)
module.exports = router;