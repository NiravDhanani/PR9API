const express = require('express')
const route = express.Router()
const multer = require('multer')


const SubcategoryController = require('../controller/SubcategoryController');





//subcategory routes 
route.get('/subcategory',SubcategoryController.subcategoryPage)
route.get('/subcategoryAdd',SubcategoryController.subcategoryAdd)
route.post('/newsubCategoryAdd',SubcategoryController.newsubCategoryAdd)
route.get('/deletesubcategory',SubcategoryController.deletesubcategory)
route.get('/editsubcategory',SubcategoryController.subcategoryEdit)
route.post('/updatesubCategory',SubcategoryController.updatesubCategory)





module.exports = route;