const { fetchAllProducts, getProductById } = require('../models/Product');

exports.getHomePage = (req, res) => {
  fetchAllProducts((products) => {
    const viewsData = {
      products,
      pageTitle: 'Home Page - Products List'
    };
    res.render('homepage', viewsData);
  });
};

exports.getProductDetailsPage = (req, res) => {
  const productId = req.params.productId;
  getProductById(productId, (product) => {
    const viewsData = {
      product,
      pageTitle: product.title
    };
    res.render('ProductDetails', viewsData);
  });
};
