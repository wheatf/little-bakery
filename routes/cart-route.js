const cartController = require('../controllers/cart-controller');

const express = require('express');
const router = express.Router();

router.post('/add', cartController.add);

router.post('/remove', cartController.remove);

router.post('/update', cartController.update);

router.get('/', cartController.cartPage);

module.exports = router;