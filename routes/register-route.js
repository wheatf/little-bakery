const userController = require('../controllers/user-controller');

const express = require('express');
const router = express.Router();

// Clients wants to go to register page.
router.get('/', userController.registerPage);

// Client wants to register an account.
router.post('/', userController.register);

module.exports = router;