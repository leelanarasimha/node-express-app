const { fetchAllProducts, getProductById } = require('../models/Product');

exports.getHomePage = (req, res) => {
  fetchAllProducts()
    .then(([products]) => {
      const viewsData = {
        admin: false,
        products,
        pageTitle: 'Home Page - Products List'
      };
      res.render('product-list', viewsData);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getProductDetailsPage = (req, res) => {
  const productId = req.params.productId;
  getProductById(productId)
    .then(([product]) => {
      const viewsData = {
        product: product[0],
        pageTitle: product[0].title
      };
      res.render('ProductDetails', viewsData);
    })
    .catch((error) => {
      console.log(error);
    });
};
