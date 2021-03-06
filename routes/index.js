const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/userController');

const User = require('../models/user');

router.get('/', userController.homeGET);

router.get('/sign-up', userController.signupGET);

router.post('/sign-up', userController.signupPOST);

router.get('/sign-in', userController.signInGET);

router.post('/sign-in', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in'
}));

router.get('/sign-out', userController.signOutGET)

module.exports = router;