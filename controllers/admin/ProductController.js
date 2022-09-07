const {
  saveProduct,
  fetchAllProducts,
  getProductById,
  updateProductById,
  deleteProductById
} = require('../../models/Product');

exports.getAddProductPage = (req, res) => {
  const viewsData = {
    edit: false,
    pageTitle: 'Add Product'
  };
  res.render('AddProduct', viewsData);
};

exports.postAddProductPage = (req, res) => {
  const product = {
    id: Date.now(),
    title: req.body.title,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description
  };
  saveProduct(product);
  res.redirect('/');
};

exports.getAdminProductsPage = (req, res) => {
  fetchAllProducts((products) => {
    const viewsData = {
      admin: true,
      pageTitle: 'Admin Products',
      products
    };
    res.render('product-list', viewsData);
  });
};

exports.getEditProductPage = (req, res) => {
  const productId = req.params.productId;

  getProductById(productId, (product) => {
    const viewsData = {
      edit: true,
      product,
      pageTitle: 'Edit Product'
    };
    res.render('AddProduct', viewsData);
  });
};

exports.postEditProductPage = (req, res) => {
  const product = {
    id: req.body.productId,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image
  };
  updateProductById(product, req.body.productId);
  res.redirect('/products');
};

exports.postDeleteProductPage = (req, res) => {
  const productId = req.body.productId;
  deleteProductById(productId, () => {
    res.redirect('/products');
  });
};
