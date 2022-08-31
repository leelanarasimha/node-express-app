const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('This is the users page');
});

router.get('/add', (req, res) => {
  res.send(`<form method="POST">
    <div><input name='username'/></div>
    <div><button>Add User</button></div>
    </form>`);
});

router.post('/add', (req, res) => {
  console.log(req.body);
  console.log('Post request ');
  res.redirect('/');
});

module.exports = router;
