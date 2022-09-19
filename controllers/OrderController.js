const Product = require('../models/ProductModel');

exports.postOrderPage = (req, res) => {
  let productsObj;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      productsObj = products;
      return req.user.createOrder();
    })
    .then((order) => {
      let productsData = productsObj.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      });
      return order.addProducts(productsData);
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getOrdersPage = (req, res) => {
  req.user.getOrders({ include: Product }).then((orders) => {
    const viewsData = {
      orders,
      pageTitle: 'Orer Details'
    };

    res.render('OrderDetailsPage', viewsData);
  });
};
