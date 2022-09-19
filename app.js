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
const User = require('./models/UserModel');
const Cart = require('./models/CartModel');
const CartItem = require('./models/CartItemModel');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//Static files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;

    next();
  });
});

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
Category.belongsTo(User);

Product.belongsTo(Category);
Product.belongsTo(User);
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Category);
User.hasMany(Product);
User.hasOne(Cart);

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: 'Leela Web Dev', email: 'leela@leela.com' });
    }
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log('server started at port 3000');
});
