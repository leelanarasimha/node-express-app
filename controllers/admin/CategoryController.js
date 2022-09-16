exports.getCategoryPage = (req, res) => {
  const viewsData = {
    pageTitle: 'Categories List'
  };

  res.render('admin/categories/categoriesPage', viewsData);
};

exports.getAddCategoryPage = (req, res) => {
  const viewsData = {
    pageTitle: 'Add Category'
  };

  res.render('admin/categories/addCategoryPage', viewsData);
};
