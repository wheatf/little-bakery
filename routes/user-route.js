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
// For this method, the route will be '/user', since '/' means no additional sub-route. Users that enters this route will be handled by user-controller.welcome() method.
router.get('/', userController.welcome);
// For this method, the route will be '/user/test', since '/test' will be added to the back of '/user', as mentioned in route.js. Users that enters this route will be handled by user-controller.test() method.
router.get('/test', userController.test);

module.exports = router;