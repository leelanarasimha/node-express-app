const express = require('express');
const { postCartPage, getCartPage, deleteCartItem } = require('../controllers/CartController');
const router = express.Router();
const { getHomePage, getProductDetailsPage } = require('../controllers/HomeController');

router.get('/', getHomePage);
router.get('/product/details/:productId', getProductDetailsPage);

router.post('/cart', postCartPage);
router.get('/cart', getCartPage);
router.post('/cart/delete-item', deleteCartItem);

module.exports = router;
