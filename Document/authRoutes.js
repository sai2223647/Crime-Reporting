const express = require('express');
const router = express.Router();
const { validateUser } = require('../middleware/validate');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/signup', validateUser, authController.signup);
router.post('/login', validateUser, authController.login);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;