const CategoryModel = require("../model/categoryModel");
const SubcategoryModel = require("../model/SubcategoryModel");
const ExSubcategoryModel = require("../model/ExSubcategoryModel");
const fs = require("fs");

const { default: axios, AxiosHeaders } = require("axios");

// Api postman
// view
const subcategoryPage = async (req, res) => {
  try {
    let subcat = await SubcategoryModel.find({}).populate("categoryId");
    return res.status(200).send({
      success: true,
      message: "subcategory fetch",
      subcat,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

// create
const newsubCategoryAdd = async (req, res) => {
  try {
    let subcat = await SubcategoryModel.create({
      categoryId: req.body.categoryId,
      subcategory: req.body.subcategory,
    });
    return res.status(200).send({
      success: true,
      message: "Subcategory Create",
      subcat,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: err,
    });
  }
};

// delete 
const deletesubcategory = async (req, res) => {
  try {
    let subcate = await SubcategoryModel.findById(req.query.id);
   let subcat = await SubcategoryModel.findByIdAndDelete(req.query.id);
    await ExSubcategoryModel.deleteMany({ subcategoryId: req.query.id });
    if (!subcat) {
      return res.status(404).send({
        success: false,
        message: "Subcategory not found",
        subcat : subcat,
      });
    }
    return res.status(200).send({
      success: true,
      message: "Subcategory  Delete",
      subcat : subcat,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: err,
    });
  }
};
//edit 
const editsubcategory = async (req,res)=>{
    const id = req.query.id;
    console.log(id);
}
// update  
const updatesubCategory = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "ID parameter is missing",
      });
    }
    let update = await SubcategoryModel.findByIdAndUpdate(id, {
      categoryId: req.body.category,
      subcategory: req.body.subcategory,
    });
    console.log(update);
    if(!update){
      return res.status(403).send({
        success : false ,
        message : ' data  not found',
        update : update,
      })
    }
    return res.status(200).send({
      success: true,
      message: "subcategory Update",
      update : update,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: err,
    });
  }
};




// fatch Api
const subcategoryViewApi = async (req, res) => {
  try {
    let record = await axios.get(`http://localhost:8000/subcategoryApi`);
    return res.render("pages/subcategory/Subcategorypage", {
      subcat: record.data.subcat,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const subcategoryCreateApi = async (req, res) => {
  try {
    const { category, subcategory } = req.body;

    // You may need to adjust the URL and request body structure based on your server's API
    const response = await axios.post(
      "http://localhost:8000/newsubCategoryAdd",
      {
        category: category,
        subcategory: subcategory,
      }
    );

    // Assuming successful creation, redirect the user to a relevant page
    return res.redirect("/subcategoryViewApi");
  } catch (err) {
    // If an error occurs, log it and send an error response
    console.error(err);
    return res.status(500).send({
      success: false,
      message: "Error creating subcategory",
    });
  }
};

const subcategoryAdd = async (req, res) => {
  try {
    let category = await CategoryModel.find({});

    return res.render("pages/subcategory/subcategoryAdd", { category });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const subcategoryEdit = async (req, res) => {
  try {
    let category = await CategoryModel.find({});
    let subcat = await SubcategoryModel.findById(req.query.id).populate(
      "categoryId"
    );
    req.flash("success", "subcategory edit");
    return res.render("pages/subcategory/subcategoryedit", {
      category,
      subcat,
    });
  } catch (err) {
    console.log(err);
    return false;
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
  editsubcategory,
};
