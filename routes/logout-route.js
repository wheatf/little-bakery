/**
 * The controller that will handle the request-response cycle for the routes defined in this page.
 */
const userController = require('../controllers/user-controller');

/**
 * The web framework.
 */
const express = require('express');
/**
 * Router for defining the routes and which routes leads to which controller's functions.
 */
/**
 * A router allows developers to structure routes in a modular, mountable way. 
 */
const router = express.Router();


router.post('/', userController.logout);


module.exports = router;