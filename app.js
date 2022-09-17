const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');
const categoryRoutes = require('./routes/categoryRoutes');
const sequelize = require('./utils/database');
const Category = require('./models/CategoryModel');
const Product = require('./models/ProductModel');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//Static files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use(homeRoutes);
app.use('/products', adminRoutes);
app.use('/categories', categoryRoutes);
app.use((req, res) => {
  const viewsData = {
    pageTitle: 'Page Not Found'
  };
  res.status(404).render('404', viewsData);
});

Category.hasMany(Product);
Product.belongsTo(Category);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log('server started at port 3000');
});
