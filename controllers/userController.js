const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.homeGET = (req, res, next) => {
  Message.find({})
    .populate('user')
    .sort([['message.date', 'ascending']])
    .exec((err, messages) => {
      if (err) return next(err);
      res.render('home', { title: 'All Messages', auth: req.isAuthenticated(), messages: messages});
    });
}

exports.signupGET = (req, res, next) => {
  res.render('signupForm', { title: 'Sign Up', auth: req.isAuthenticated() });
};

exports.signupPOST = [
  // Validate + Sanitize
  body('firstname')
    .notEmpty()
    .isLength({ min: 1, max: 40 })
    .trim()
    .escape(),
  
  body('lastname')
    .notEmpty()
    .isLength({ min: 1, max: 40 })
    .trim()
    .escape(),  

  body('username')
    .notEmpty().withMessage('Username field cannot be empty.')
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 6 and 20 characters')
    .trim()
    .escape(),

  body('password')
    .notEmpty().withMessage('Username field cannot be empty.')
    .isAlphanumeric()
    .isLength({ min: 6 })
    .trim()
    .escape(),
  
  body('confirm-password')
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  
  body('secret')
    .custom(value => {
      if (value !== process.env.SECRET_CODE) {
        throw new Error('Incorrect Secret Code');
      }
      return true;
    }),
  
  // Handle
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('signupForm', { title: 'Sign Up', auth: req.isAuthenticated(), errors: errors.array() });
      return;
    }
    await User.find({ username: req.body.username })
      .exec((err, users) => {
        if (err) return next(err);
        if (users.length > 0) {
          res.render('signupForm', { title: 'Sign Up', usernameTaken: true }); // redirect to signup form, display error based on usernameTaken
          return;
        } else {
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err);
            const user = new User({
              firstName: req.body.firstname,
              lastName: req.body.lastname,
              username: req.body.username,
              password: hashedPassword
            }).save(err => {
              if (err) return next(err);
              res.render('signupForm', { title: 'Sign Up', auth: req.isAuthenticated() });
            });
          });
        }  
      });
  }
];

exports.signInGET = (req, res, next) => {
  res.render('signin', { title: 'Log In', auth: req.isAuthenticated() });
};

exports.signOutGET = (req, res, next) => {
  if (!req.isAuthenticated()) return;
  req.logout();
  res.redirect('/');
}