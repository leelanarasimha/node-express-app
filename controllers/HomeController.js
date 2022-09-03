const { fetchAllProducts } = require('../models/Product');

exports.getHomePage = (req, res) => {
  fetchAllProducts((products) => {
    const viewsData = {
      products,
      pageTitle: 'Home Page - Products List'
    };
    res.render('homepage', viewsData);
  });
};
