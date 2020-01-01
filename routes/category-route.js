const categoryController = require('../controllers/category-controller');

const express = require('express');
const router = express.Router();

// Client wants to go to categories page.
router.get('/', categoryController.categoriesPage);

// Client wants to go to a specific category page.
router.get('/:category', categoryController.categoryPage);

module.exports = router;