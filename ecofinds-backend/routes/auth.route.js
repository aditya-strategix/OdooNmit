const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../middlewares/validation');

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', validateRegister, register);

// @route   POST /api/auth/login

router.post('/login', validateLogin, login);

module.exports = router;