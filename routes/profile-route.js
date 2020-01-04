const userController = require('../controllers/user-controller');

const express = require('express');
const router = express.Router();

// Client wants to go to profile page
router.get('/', userController.profilePage);

// Client wants to see his orders history
router.get('/order-history', userController.orderHistoryPage);

router.get('/order-history/:orderId', userController.orderDetailHistoryPage);

module.exports = router;