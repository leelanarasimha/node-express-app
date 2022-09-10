const { addProductToCart, getCartDetailsFromFile, deleteProductFromCart } = require('../models/Cart');
const { getProductById, fetchAllProducts } = require('../models/Product');

exports.postCartPage = (req, res) => {
  const productId = req.body.productId;
  getProductById(productId, (product) => {
    addProductToCart(productId, product.price);
    res.redirect('/');
  });
};

exports.getCartPage = (req, res) => {
  getCartDetailsFromFile((cart) => {
    const cartProducts = cart.products;
    fetchAllProducts((products) => {
      const productsData = [];
      let totalPrice = 0;
      for (let cartItem of cartProducts) {
        let singleProduct = products.find((prod) => prod.id.toString() === cartItem.id.toString());
        cartProductPrice = +cartItem.quantity * +singleProduct.price;
        totalPrice += cartProductPrice;
        productsData.push({ ...singleProduct, quantity: cartItem.quantity, cartPrice: cartProductPrice });
      }

      const viewsData = {
        pageTitle: 'Cart Details',
        cartProducts: productsData,
        totalPrice
      };

      res.render('cartDetails', viewsData);
    });
  });
};

exports.deleteCartItem = (req, res) => {
  const productId = req.body.productId;
  deleteProductFromCart(productId, () => {
    res.redirect('/cart');
  });
};
