const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/sign-up', (req, res, next) => {
  res.render('signupForm', {title: 'Sign Up'});
});

router.post('/sign-up', userController.signUpPOST);

module.exports = router;