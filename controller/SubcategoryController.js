const CategoryModel = require("../model/categoryModel");
const SubcategoryModel = require("../model/SubcategoryModel");
const ExSubcategoryModel = require("../model/ExSubcategoryModel");
const fs = require("fs");
const { default: axios, AxiosHeaders } = require("axios");


// pages routes  
const subcategoryPage = async (req, res) => {
  try {
    let subcat = await SubcategoryModel.find({}).populate("categoryId");
    return res.status(200).send({
      success : true,
      message : "subcategory fetch",
      subcat,
    })
  } catch (err) {
    console.log(err);
    return false;
  }
};



// api postman  
const newsubCategoryAdd = async (req, res) => {
  try {
    let subcat  = await SubcategoryModel.create({
      categoryId: req.body.category,
      subcategory: req.body.subcategory,
    });
    return res.status(200).send({
       success : true,
       message : "Subcategory Create",
       subcat,
    })
  } catch (err) {
    return res.status(503).send({
      success : false,
      message : err,
   })
  }
};


// fatch Api
const subcategoryViewApi = async (req,res)=>{
  try{
    let record = await axios.get(`http://localhost:8000/subcategoryApi`);
    return res.render('pages/subcategory/Subcategorypage',{
      subcat : record.data.subcat,
    })
  } catch(err){
    console.log(err);
    return false;
  }
} 

// const subcategoryCreateApi = async (req,res)=>{
//   try{

//     let record = await axios.post('http://localhost:8000/newsubCategoryAdd',{
//       category : req.body.category,
//       categoryId : category,
//       subcategory : req.body.subcategory,
//     })
//     return res.redirect('/subcategoryApi');

//   } catch(err){
//     console.log(err);
//     return false;
//   }
// }

const subcategoryCreateApi = async (req, res) => {
  try {
    const { category, subcategory } = req.body;

    // You may need to adjust the URL and request body structure based on your server's API
    const response = await axios.post('http://localhost:8000/newsubCategoryAdd', {
      category: category,
      subcategory: subcategory
    });

    // Assuming successful creation, redirect the user to a relevant page
    return res.redirect('/subcategoryViewApi');
  } catch (err) {
    // If an error occurs, log it and send an error response
    console.error(err);
    return res.status(500).send({
      success: false,
      message: 'Error creating subcategory'
    });
  }
};



//////


const subcategoryAdd = async (req, res) => {
  try {
    let category = await CategoryModel.find({});
 
    return res.render("pages/subcategory/subcategoryAdd", { category });
  } catch (err) {
    console.log(err);
    return false;
  }
};




// const subcategoryAddApi = async (req,res)=>{
//   try{

//   } catch (err){
//     console.log(err);
//     return flash
//   }
// }

const deletesubcategory = async (req, res) => {
  try {
    await SubcategoryModel.findByIdAndDelete(req.query.id);
    await ExSubcategoryModel.deleteMany({ subcategoryId: req.query.id });
    console.log("subcategory Delete" );
    req.flash('red','subcategory delete Successful')
    // return res.redirect("back");
    return res.status(200).send({
      success : true,
      message : "Subcategory  Delete",
    })
  } catch (err) {
    return res.status(503).send({
      success : false,
      message : err,
    })
  }
};

const subcategoryEdit = async (req, res) => {
  try {
    let category = await CategoryModel.find({});
    let subcat = await SubcategoryModel.findById(req.query.id).populate(
      "categoryId"
    );
    req.flash('success','subcategory edit')
    return res.render("pages/subcategory/subcategoryedit", { category, subcat });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updatesubCategory = async (req, res) => {
  try {
    let id = req.body.id;
    let up = await SubcategoryModel.findByIdAndUpdate(id, {
      categoryId : req.body.category,
      subcat_name: req.body.subcategory,
    });
    req.flash('success','subcategory Update')
    // return res.redirect("/subcategory");
    return res.status(200).send({
      success : true,
      message : "subcategory Update",
    })
  } catch (err) {
    return res.status(503).send({
      success : false,
      message : err,
    })
  }
};



module.exports = {
  subcategoryPage,
  subcategoryAdd,
  newsubCategoryAdd,
  deletesubcategory,
  subcategoryEdit,
  updatesubCategory,


  // fetchApi 
  subcategoryViewApi,
  subcategoryCreateApi,
};
