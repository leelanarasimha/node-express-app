const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../utils/path');
const productsData = require('../utils/products');

router.get('/', (req, res) => {
  const viewsData = {
    products: productsData.products,
    pageTitle: 'Home Page - Products List'
  };
  res.render('homepage', viewsData);
});

module.exports = router;
