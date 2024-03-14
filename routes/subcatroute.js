const express = require('express')
const route = express.Router()
const multer = require('multer')


const SubcategoryController = require('../controller/SubcategoryController');





//subcategory routes 
route.get('/subcategoryApi',SubcategoryController.subcategoryPage) // api
route.delete('/deletesubcategory',SubcategoryController.deletesubcategory) //api
route.get('/subcategoryAdd',SubcategoryController.subcategoryAdd)
route.post('/newsubCategoryAdd',SubcategoryController.newsubCategoryAdd)
route.get('/editsubcategory',SubcategoryController.subcategoryEdit)
route.put('/updatesubCategory',SubcategoryController.updatesubCategory)
route.get('/editsubcategory',SubcategoryController.editsubcategory) // api


// fetch Api 
route.get('/subcategoryViewApi',SubcategoryController.subcategoryViewApi);
route.post('/subcategoryCreateApi',SubcategoryController.subcategoryCreateApi);







module.exports = route;