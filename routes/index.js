const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/sign-up', userController.signupGET);

router.post('/sign-up', userController.signupPOST);

module.exports = router;