const products = [{ title: 'Product 1' }];

const addProduct = (product) => {
  products.push(product);
};

module.exports = {
  products,
  addProduct
};
