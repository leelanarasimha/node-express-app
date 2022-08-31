const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Logging the request');
  next();
});

// app.use((req, res, next) => {
//   console.log('second middleware');
// });

app.use('/users', (req, res, next) => {
  res.send('This is the users page');
});

app.use('/', (req, res, next) => {
  res.send('<h1>This is the home page</h1>');
});

app.listen(3000, () => {
  console.log('server started at port 3000');
});
