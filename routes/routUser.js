const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const {register, login, check} = require('../Conteroller/userController')

router.post("/register", register)
router.post("/login", login)
router.get("/check", authMiddleware,check)
module.exports = router;