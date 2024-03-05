const express = require('express')
const route = express.Router()


const CategoryController = require('../controller/CategoryController')

  


// category routes  
route.get('/category',CategoryController.category)
route.get('/categoryAdd',CategoryController.categoryAdd)
route.post('/newCategoryAdd',CategoryController.newCategoryAdd)
route.get('/deleteCategory',CategoryController.deleteCategory)
route.get('/editCategory',CategoryController.categoryEdit)
route.post('/updatecategory',CategoryController.updatecategory)

route.get('/activateCategory',CategoryController.activateCategory);
route.get('/deactivateCategory',CategoryController.deactivateCategory);
module.exports = route;