const { addProductToCart, getCartDetailsFromFile, deleteProductFromCart } = require('../models/Cart');
const { getProductById, fetchAllProducts } = require('../models/Product');
const Product = require('../models/ProductModel');

exports.postCartPage = (req, res) => {
  const productId = req.body.productId;
  let newQuantity = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      if (!cart) {
        return req.user.createCart();
      }
      return cart;
    })
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      if (products.length) {
        newQuantity = products[0].cartItem.quantity + 1;
        return products[0];
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getCartPage = (req, res) => {
  getCartDetailsFromFile((cart) => {
    const cartProducts = cart.products;
    fetchAllProducts()
      .then(([products]) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

exports.deleteCartItem = (req, res) => {
  const productId = req.body.productId;
  deleteProductFromCart(productId, () => {
    res.redirect('/cart');
  });
};
