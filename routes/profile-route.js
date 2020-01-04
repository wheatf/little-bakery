const userController = require('../controllers/user-controller');

const express = require('express');
const router = express.Router();

// Client wants to go to profile page
router.get('/', userController.profilePage);

module.exports = router;