const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const db = require('../utils/database');
const { deleteProductFromCart } = require('./Cart');

const getProductsFromFile = (callBack) => {
  const productsPath = path.join(rootDir, 'data', 'products.json');
  fs.readFile(productsPath, (error, productsData) => {
    if (error) {
      return callBack([]);
    }

    return callBack(JSON.parse(productsData));
  });
};

exports.saveProduct = (product) => {
  return db.execute(`INSERT INTO products (title, description, price, imageUrl) values (?,?,?,?)`, [
    product.title,
    product.description,
    product.price,
    product.imageUrl
  ]);
};

exports.fetchAllProducts = () => {
  return db.execute(`SELECT * FROM products`);
};

exports.getProductById = (productId) => {
  return db.execute(`select * from products where id = ?`, [productId]);
};

exports.updateProductById = (product, productId) => {
  const productsPath = path.join(rootDir, 'data', 'products.json');
  getProductsFromFile((products) => {
    const existingProductIndex = products.findIndex((prod) => prod.id.toString() === productId);

    const updatedProducts = [...products];
    updatedProducts[existingProductIndex] = product;
    fs.writeFile(productsPath, JSON.stringify(updatedProducts), (error) => {
      console.log(error);
    });
  });
};

exports.deleteProductById = (productId, callBack) => {
  const productsPath = path.join(rootDir, 'data', 'products.json');
  getProductsFromFile((products) => {
    let updatedProducts = products.filter((product) => product.id.toString() !== productId.toString());
    deleteProductFromCart(productId);

    fs.writeFile(productsPath, JSON.stringify(updatedProducts), (error) => {
      console.log(error);
    });
    callBack();
  });
};
