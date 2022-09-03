const path = require('path');
const express = require('express');
const rootDir = require('../utils/path');
const productsData = require('../utils/products');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'User.html'));
});

router.get('/add', (req, res) => {
  const viewsData = {
    pageTitle: 'Add Product'
  };
  res.render('AddProduct', viewsData);
});

router.post('/add', (req, res) => {
  const product = {
    title: req.body.title
  };
  productsData.addProduct(product);
  res.redirect('/');
});

module.exports = router;
