const cartController = require('../controllers/cart-controller');

const express = require('express');
const router = express.Router();

router.post('/add', cartController.add);

router.get('/', cartController.cartPage);

module.exports = router;