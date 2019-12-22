/**
 * The controller that will handle the request-response cycle for the routes defined in this page.
 */
const loginController = require('../controllers/login-controller');

/**
 * Extracts the entire body of an incoming request.
 */
const bodyParser = require('body-parser');
/**
 * Parse URL encoded data sent using HTTP POST requests, such as from a form.
 */
const urlencodedParser = bodyParser.urlencoded({
    // If true, objects parsed can contain values of any types, rather than just String or array.
    extended: true
});

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
// For this method, the route will be '/login', since '/' means no additional sub-route. Users that enters this route will be handled by login-controller.loginPage() method.
router.get('/', loginController.loginPage);
// For this method, the route will be '/login', since '/' means no additional sub-route. Users that enters this route will be handled by login-controller.login() method.
// This route will use the urlencoded parser as a middleware to read data from forms.
router.post('/', urlencodedParser, loginController.login);

module.exports = router;