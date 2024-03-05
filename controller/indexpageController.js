const categoryModel = require('../model/categoryModel')
const SubcategoryModel = require('../model/SubcategoryModel')
const ExSubcategoryModel = require('../model/ExSubcategoryModel')

const AdminIndexPage = async(req,res)=>{
    try{
        let cat = await categoryModel.find({});
        let subcat = await SubcategoryModel.find({});
        let exsubcat = await ExSubcategoryModel.find({}).populate('categoryId').populate('subcategoryId');
        return res.render('pages/adminindex',{cat,subcat,exsubcat})
    } catch (err){
        console.log(err);
        return false;
    }
}



module.exports = {
    AdminIndexPage
}