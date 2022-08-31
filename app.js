const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(homeRoutes);
app.use('/users', adminRoutes);

app.use((req, res) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000, () => {
  console.log('server started at port 3000');
});
