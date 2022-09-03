const express = require('express');
const { getAddProductPage, postAddProductPage } = require('../controllers/admin/ProductController');

const router = express.Router();

router.get('/add', getAddProductPage);
router.post('/add', postAddProductPage);

module.exports = router;
