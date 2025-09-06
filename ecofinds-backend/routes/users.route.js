const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const { validateUserUpdate } = require('../middlewares/validation');

const router = express.Router();

// @route   GET /api/users/:id

router.get('/:id', auth, getUserProfile);

// @route   PUT /api/users/:id
router.put('/:id', auth, validateUserUpdate, updateUserProfile);

module.exports = router;