const express = require('express');
const { postCartPage, getCartPage, deleteCartItem } = require('../controllers/CartController');
const router = express.Router();
const { getHomePage, getProductDetailsPage } = require('../controllers/HomeController');
const { postOrderPage } = require('../controllers/OrderController');

router.get('/', getHomePage);
router.get('/product/details/:productId', getProductDetailsPage);

router.post('/cart', postCartPage);
router.get('/cart', getCartPage);
router.post('/cart/delete-item', deleteCartItem);
router.post('/order', postOrderPage);

module.exports = router;
