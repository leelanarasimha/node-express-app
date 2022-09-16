const express = require('express');
const {
  getCategoryPage,
  getAddCategoryPage,
  postAddCategoryPage
} = require('../controllers/admin/CategoryController');

const router = express.Router();

router.get('/', getCategoryPage);

router.get('/add', getAddCategoryPage);
router.post('/add', postAddCategoryPage);

module.exports = router;
