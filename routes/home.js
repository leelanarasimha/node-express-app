const express = require('express');
const router = express.Router();
const { getHomePage } = require('../controllers/HomeController');

router.get('/', getHomePage);

module.exports = router;
