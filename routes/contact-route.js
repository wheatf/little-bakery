const contactController = require('../controllers/contact-controller');

const express = require('express');
const router = express.Router();



router.get('/', contactController.contactPage);

module.exports = router;