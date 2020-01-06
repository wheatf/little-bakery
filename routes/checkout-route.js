const checkoutController = require('../controllers/checkout-controller');

const express = require('express');
const router = express.Router();

// Client wants to go to checkout page.
router.get('/', checkoutController.checkoutPage);

// Client wants to go to checkout.
router.post('/', checkoutController.checkout);

module.exports = router;