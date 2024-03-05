const CategoryModel = require("../model/categoryModel");
const SubcategoryModel = require("../model/SubcategoryModel");
const ExSubcategoryModel = require("../model/ExSubcategoryModel");
const fs = require("fs");

const subcategoryPage = async (req, res) => {
  try {
    let category = await CategoryModel.find({});
    let subcat = await SubcategoryModel.find({}).populate("categoryId");
    return res.render("pages/subcategory/Subcategory", { subcat, category });
  } catch (err) {
    console.log(err);
    return false;
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

const newsubCategoryAdd = async (req, res) => {
  try {
    await SubcategoryModel.create({
      categoryId: req.body.category,
      subcat_name: req.body.subcat_name,
    });
    console.log("Sub category add");
    req.flash('success','sub category add')
    return res.redirect("/subcategory");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deletesubcategory = async (req, res) => {
  try {
    await SubcategoryModel.findByIdAndDelete(req.query.id);
    await ExSubcategoryModel.deleteMany({ subcategoryId: req.query.id });
    console.log("subcategory Delete");
    req.flash('red','subcategory delete Successful')
    return res.redirect("back");
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
      subcat_name: req.body.subcat_name,
    });
    req.flash('success','subcategory Update')
    return res.redirect("/subcategory");
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
};
