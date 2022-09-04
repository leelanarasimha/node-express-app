const { addProductToCart } = require('../models/Cart');
const { getProductById } = require('../models/Product');

exports.postCartPage = (req, res) => {
  const productId = req.body.productId;
  getProductById(productId, (product) => {
    addProductToCart(productId, product.price);
    res.redirect('/');
  });
};

exports.getCartPage = (req, res) => {};
