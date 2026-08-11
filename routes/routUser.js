const express = require('express');
const router = express.Router();


const {register, login, check} = require('../Conteroller/userController')

router.post("/register", register)
router.post("/login", login)
router.get("/check", check)

router.get("/check", (req, res) => {
    res.send("check user")
})
module.exports = router;