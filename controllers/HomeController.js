const Category = require('../models/CategoryModel');
const { fetchAllProducts, getProductById } = require('../models/Product');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');

exports.getHomePage = (req, res) => {
  Product.findAll({ include: [{ model: Category }, { model: User }] })
    .then((products) => {
      console.log(products);
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

  Product.findAll({ where: { id: productId } })
    .then((product) => {
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
