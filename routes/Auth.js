const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/Auth');

const router = express.Router();

router.post('/register', [
    body('username').isLength({min:3}).withMessage('minimun username 5 karakter'), 
    body('password').isLength({min:5}).withMessage('minimum password 5 karakter')],
    authController.register);
router.post('/login', authController.login);
router.get('/login', authController.getLogin);
router.get('/logout', authController.logout);

module.exports = router;

