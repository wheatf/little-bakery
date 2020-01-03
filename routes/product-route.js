const productController = require('../controllers/product-controller');

const express = require('express');
const router = express.Router();

// Clients wants to go to a specific product
router.get('/:productId', productController.productPage);

module.exports = router;