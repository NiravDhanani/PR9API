const express = require('express')
const route = express.Router()


const CategoryController = require('../controller/CategoryController')

  

//page render routes 




// category routes  
route.get('/categoryApi',CategoryController.category) //api
route.post('/newCategoryAdd',CategoryController.newCategoryAdd) //api
route.delete('/deleteCategory',CategoryController.deleteCategory) // api
route.put('/updatecategory',CategoryController.updatecategory) //api
route.get('/editCategory',CategoryController.categoryEdit) // api

// api fetching 
route.get('/category',CategoryController.fetchcategory)  
route.post('/addcategoryApi',CategoryController.addcategoryApi);
route.get('/deletecategoryApi',CategoryController.deletecategoryApi);
route.get('/editcategoryApi',CategoryController.editcategoryApi);
route.post('/updatecategoryApi',CategoryController.updatecategoryApi);




route.get('/activateCategory',CategoryController.activateCategory);
route.get('/deactivateCategory',CategoryController.deactivateCategory);
route.get('/categoryAdd',CategoryController.categoryAdd) 
module.exports = route;