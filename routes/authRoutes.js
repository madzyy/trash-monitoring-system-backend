const express = require('express');
const AuthController = require('../controllers/authenticationController');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
