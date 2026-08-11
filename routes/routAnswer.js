const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send("post answer")
})
module.exports = router;