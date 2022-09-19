exports.postOrderPage = (req, res) => {
  let productsObj;
  req.user
    .getCart()
    .then((cart) => {
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
      res.redirect('/order');
    });
};
