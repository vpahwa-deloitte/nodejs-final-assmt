const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/authMiddleware');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

router.get('/', authenticateJWT, userController.getAllUsers);

module.exports = router;
