const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');

const app = express();

app.use(express.static(path.join(rootDir, 'public')));

app.use('/css', express.static(path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(homeRoutes);
app.use('/users', adminRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(3000, () => {
  console.log('server started at port 3000');
});
