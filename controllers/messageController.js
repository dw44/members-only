const User = require('../models/user');
const Message = require('../models/message');

const { body, validationResult } = require('express-validator');

exports.newMessageGET = (req, res, next) => {
  res.render('newMessage', { title: 'Add Message', auth: req.isAuthenticated() });
}

exports.newMessagePOST = [
  body('title')
    .notEmpty()
    .isLength({ min: 1, max: 30 }).withMessage('Title needs to be between 1 and 30 characters')
    .trim()
    .escape(),
  body('content')
    .notEmpty()
    .isLength({ min: 1, max: 2000 }).withMessage('Message needs to be between ')
    .trim()
    .escape(),
  
  (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      time: new Date(),
      user: req.user
    });

    if (!errors.isEmpty()) {
      res.render('newMessage', { title: 'Add Message', auth: req.isAuthenticated(), errors: errors.array() });
      return;
    }

    if (!req.isAuthenticated()) res.redirect('/sign-in');
    else (message.save(err => {
      if (err) return next(err);
      res.redirect('/messages');
    }));
  }
];

exports.deleteMessageGET = (req, res, next) => {
  Message.findById( req.params.messageId )
    .exec((err, message) => {
      if (err) return next(err);
      if (!(req.isAuthenticated() && req.user.admin)) {
        res.redirect('/')
      } else {
        res.render('deleteMessage', { title: 'Delete Message', auth: req.isAuthenticated(), message });
      }
    });
};

exports.deleteMessagePOST = (req, res, next) => {
  Message.findByIdAndDelete(req.body.id, err => {
    if (err) return next(err);
    res.redirect('/');
  });
};