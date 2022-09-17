const Category = require('../../models/CategoryModel');
const Product = require('../../models/ProductModel');

exports.getAddProductPage = (req, res) => {
  Category.findAll({ attributes: ['id', 'title'] })
    .then((categories) => {
      console.log(categories);
      const viewsData = {
        edit: false,
        categories,
        pageTitle: 'Add Product'
      };
      res.render('AddProduct', viewsData);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postAddProductPage = (req, res) => {
  const categoryId = req.body.categoryId;

  const product = {
    title: req.body.title,
    imageUrl: req.body.image,
    price: req.body.price,
    description: req.body.description
  };

  let categoryObj;

  Category.findByPk(categoryId)
    .then((category) => {
      categoryObj = category;
      return Product.create(product);
    })
    .then((productObj) => {
      return productObj.setCategory(categoryObj);
    })
    .then(() => {
      return res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAdminProductsPage = (req, res) => {
  Product.findAll()
    .then((products) => {
      const viewsData = {
        admin: true,
        pageTitle: 'Admin Products',
        products
      };
      res.render('product-list', viewsData);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getEditProductPage = (req, res) => {
  const productId = req.params.productId;

  Product.findByPk(productId)
    .then((product) => {
      const viewsData = {
        edit: true,
        product,
        pageTitle: 'Edit Product'
      };
      res.render('AddProduct', viewsData);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postEditProductPage = (req, res) => {
  const productId = req.body.productId;
  const product = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.image
  };
  Product.update(product, { where: { id: productId } })
    .then(() => {
      res.redirect('/products');
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postDeleteProductPage = (req, res) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      res.redirect('/products');
    })
    .catch((error) => {
      console.log(error);
    });
};
