const express = require('express')
const route = express.Router()
const multer = require('multer')


const ExSubcategoryController = require('../controller/excategoryController');

// multer code 
const fileUpload = multer({storage : multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename : (req,file,cb)=>{
        let img = Date.now() + file.originalname;
        cb(null,img);
    }
}
)}).single('image')


// Extra subcategory route
route.get('/exsubcategory',ExSubcategoryController.excategoryPage)
route.get('/exsubcategoryAdd',ExSubcategoryController.exsubcategoryAdd)
route.post('/newexsubCategoryAdd',fileUpload,ExSubcategoryController.newexsubCategoryAdd)
route.get('/exsubcatedelete',ExSubcategoryController.exsubcatedelete)
route.get('/exsubcateedit',fileUpload,ExSubcategoryController.editPage)
route.post('/updateExcate',fileUpload,ExSubcategoryController.updateExcate)

route.get('/categoryWiseFilter',ExSubcategoryController.categoryWiseFilter);




module.exports = route;