const CategoryModel = require("../model/categoryModel");
const SubcategoryModel = require("../model/SubcategoryModel");
const ExsubcategoryModel = require("../model/ExSubcategoryModel");
const fs = require("fs");

const excategoryPage = async (req, res) => {
  try {
    let exsubcat = await ExsubcategoryModel.find({})
      .populate("subcategoryId")
      .populate("categoryId");
    return res.render("pages/excategory/ExSubcategory", { exsubcat });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const exsubcategoryAdd = async (req, res) => {
  try {
    let category = await CategoryModel.find({});
    let subcategory = await SubcategoryModel.find({});
    return res.render("pages/excategory/ExSubcategoryAdd", {
      category,
      subcategory,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const newexsubCategoryAdd = async (req, res) => {
  try {
    await ExsubcategoryModel.create({
      categoryId: req.body.category,
      subcategoryId: req.body.subcategory,
      product: req.body.product,
      qty: req.body.qty,
      price: req.body.price,
      discription: req.body.discription,
      image: req.file.path,
    });
    req.flash("success", "sub category add");
    return res.redirect("/exsubcategory");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const exsubcatedelete = async (req, res) => {
  try {
    let del = await ExsubcategoryModel.findById(req.query.id);
    fs.unlinkSync(del.image);
    await ExsubcategoryModel.findByIdAndDelete(req.query.id);
    req.flash("red", "subcategory delete Successful");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const editPage = async (req, res) => {
  try {
    let category = await CategoryModel.find({});
    let subcategory = await SubcategoryModel.find({});
    let excategory = await ExsubcategoryModel.findById(req.query.id)
      .populate("categoryId")
      .populate("subcategoryId");
    req.flash("success", "subcategory edit");
    return res.render("pages/excategory/ExSubcategoryEdit", {
      category,
      subcategory,
      excategory,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateExcate = async (req, res) => {
  try {
    let id = req.body.id;
    let old = await ExsubcategoryModel.findById(id);

    if (req.file) {
      
      fs.unlinkSync(old.image);
      let up = await ExsubcategoryModel.findByIdAndUpdate(id, {
        categoryId: req.body.category,
        subcategoryId: req.body.subcategory,
        product: req.body.product,
        qty: req.body.qty,
        price: req.body.price,
        discription: req.body.discription,
        image: req.file.path,
      });
    } else {
      let up = await ExsubcategoryModel.findByIdAndUpdate(id, {
        categoryId: req.body.category,
        subcategoryId: req.body.subcategory,
        product: req.body.product,
        qty: req.body.qty,
        price: req.body.price,
        discription: req.body.discription,
        image: old.image,
      });
    }
    req.flash("success", "subcategory Update");
    return res.redirect("/exsubcategory");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const categoryWiseFilter = async (req, res) => {
  try {
    let id = req.query.id;
    let subcat = await SubcategoryModel.find({}).populate("categoryId");
    let data = subcat.filter((val) => {
      return val.categoryId.id == id;
    });
    
    return res.json({
         data
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  excategoryPage,
  exsubcategoryAdd,
  newexsubCategoryAdd,
  exsubcatedelete,
  editPage,
  updateExcate,
  categoryWiseFilter,
};
