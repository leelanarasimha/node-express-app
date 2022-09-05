const express = require('express');
const {
  getAddProductPage,
  postAddProductPage,
  getAdminProductsPage
} = require('../controllers/admin/ProductController');

const router = express.Router();

router.get('/', getAdminProductsPage);
router.get('/add', getAddProductPage);
router.post('/add', postAddProductPage);

module.exports = router;
