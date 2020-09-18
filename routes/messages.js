const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

const User = require('../models/user');
const Message = require('../models/message');

const { body, validationResult } = require('express-validator');

router.get('/new', messageController.newMessageGET);

router.post('/new', messageController.newMessagePOST);

router.get('/:messageId/delete', messageController.deleteMessageGET);

router.post('/:messageId/delete', messageController.deleteMessagePOST);

module.exports = router;
