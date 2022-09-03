const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

exports.saveProduct = (product) => {
  const productsPath = path.join(rootDir, 'data', 'products.json');

  fs.readFile(productsPath, (error, productsData) => {
    let products = [];
    if (!error) {
      products = JSON.parse(productsData);
    }
    products.push(product);
    fs.writeFile(productsPath, JSON.stringify(products), (error) => {
      console.log(error);
    });
  });
};

exports.fetchAllProducts = (callBack) => {
  const productsPath = path.join(rootDir, 'data', 'products.json');
  fs.readFile(productsPath, (error, productsData) => {
    const products = JSON.parse(productsData);
    callBack(products);
  });
};
