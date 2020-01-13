const aboutController = require('../controllers/about-controller');

const express = require('express');
const router = express.Router();



router.get('/', aboutController.aboutPage);

module.exports = router;