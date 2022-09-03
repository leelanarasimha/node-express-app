const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../utils/path');

router.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'homepage.html'));
});

module.exports = router;
