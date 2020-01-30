const productController = require('../controllers/product-controller');

const express = require('express');
const router = express.Router();

// Clients wants to go to a specific product
router.get('/:productId', productController.productPage);

// Clients wants to go search page
router.get('/search/:valueToSearch', productController.searchPage);

// Client wants to search for product by product name
router.post('/search', productController.search);

module.exports = router;