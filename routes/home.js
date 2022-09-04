const express = require('express');
const { postCartPage, getCartPage } = require('../controllers/CartController');
const router = express.Router();
const { getHomePage, getProductDetailsPage } = require('../controllers/HomeController');

router.get('/', getHomePage);
router.get('/product/details/:productId', getProductDetailsPage);

router.post('/cart', postCartPage);
router.get('/cart', getCartPage);

module.exports = router;
