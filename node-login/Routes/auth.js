const express = require('express');
const router = express.Router();
const { signup, login, getProfile } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', getProfile);


module.exports = router;