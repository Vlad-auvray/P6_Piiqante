const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const isPasswordValid = require("../middleware/password")
const isEmailValid = require("../middleware/email")

router.post('/signup',isEmailValid, isPasswordValid, userCtrl.signup);
router.post('/login',isEmailValid, isPasswordValid, userCtrl.login);

module.exports = router;