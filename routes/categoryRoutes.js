const express = require('express');
const { getCategoryPage, getAddCategoryPage } = require('../controllers/admin/CategoryController');

const router = express.Router();

router.get('/', getCategoryPage);
router.get('/add', getAddCategoryPage);

module.exports = router;
