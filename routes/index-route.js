/**
 * The controller that will handle the request-response cycle for the routes defined in this page.
 */
const indexController = require('../controllers/index-controller');

/**
 * The web framework.
 */
const express = require('express');
/**
 * Router for defining the routes and which routes leads to which controller's functions.
 */
const router = express.Router();

// Each route will be added to the back of the top-level route in route.js.
// For this method, the route will be '/', since the top-level route is defined as '/'.
router.get('/', indexController.indexPage);
// For this method, the route will be '/index', since the top-level route is defined as '/'.
router.get('/index', indexController.indexPage);
// For this method, the route will be '/home', since the top-level route is defined as '/home'.
router.get('/home', indexController.indexPage);

module.exports = router;