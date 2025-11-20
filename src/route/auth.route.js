const express = require('express');
const AuthController = require('../controller/auth.controller');

const router = express.Router();

router.post('/register', AuthController.registerUser);

router.post('/login', AuthController.userlogin);

module.exports = router;