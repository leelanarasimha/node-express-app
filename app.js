const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');
const sequelize = require('./utils/database');

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
app.use((req, res) => {
  const viewsData = {
    pageTitle: 'Page Not Found'
  };
  res.status(404).render('404', viewsData);
});

sequelize
  .authenticate()
  .then(() => {
    console.log('connection established successfully');
  })
  .catch((error) => {
    console.log(error);
    console.log('Error in establishing connection');
  });

app.listen(3000, () => {
  console.log('server started at port 3000');
});
