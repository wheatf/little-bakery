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

// Each route will be added to the back of the top-level route in route.js.
// For this method, the route will be '/login', since '/' means no additional sub-route. Users that enters this route will be handled by account-controller.loginPage() method.
router.get('/', userController.loginPage);
// For this method, the route will be '/login', since '/' means no additional sub-route. Users that enters this route will be handled by account-controller.login() method.
// This route will use the urlencoded parser as a middleware to read data from forms.
router.post('/', userController.login);


module.exports = router;