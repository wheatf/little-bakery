const userController = require('../controllers/user-controller');

const express = require('express');
const router = express.Router();

// Client wants to go to profile page
router.get('/', userController.profilePage);

// AJAX get user's points
router.get('/getPoints', userController.getPoints);

// Client wants to go to edit profile page.
router.get('/edit', userController.editProfilePage);

// Client wants to edit his profile page.
router.post('/edit', userController.editProfile);

// Client wants to see his orders history
router.get('/order-history', userController.orderHistoryPage);

// Client wants to see the order details of a order history.
router.get('/order-history/:orderId', userController.orderDetailHistoryPage);

module.exports = router;