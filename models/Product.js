const products = [];

exports.saveProduct = (product) => {
  products.push(product);
};

exports.getAllProducts = () => {
  return products;
};
