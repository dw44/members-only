const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

const User = require('../models/user');

router.get('/', adminController.adminPanelGET);

module.exports = router;