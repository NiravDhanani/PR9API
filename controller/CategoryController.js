const CategoryModel = require("../model/categoryModel");
const SubcategoryModel = require("../model/SubcategoryModel");
const ExSubcategoryModel = require("../model/ExSubcategoryModel");
const fs = require("fs");

const category = async (req, res) => {
  try {
    let category = await CategoryModel.find({});
    return res.render("pages/category/category", { category });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const categoryAdd = async (req, res) => {
  try {
    return res.render("pages/category/categoryAdd");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const newCategoryAdd = async (req, res) => {
  try {
    let data = await CategoryModel.create({
      cat_name: req.body.cat_name,
    });
    console.log(`category add`);
    req.flash("success", "category add");
    return res.redirect("/category");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteCategory = async (req, res) => {
  try {
    await CategoryModel.findByIdAndDelete(req.query.id);
    await SubcategoryModel.deleteMany({ categoryId: req.query.id });
    await ExSubcategoryModel.deleteMany({ categoryId: req.query.id });
    // console.log("Date Delete  !!");
    req.flash("red", "category delete Successful");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const categoryEdit = async (req, res) => {
  try {
    let category = await CategoryModel.findById(req.query.id);

    req.flash("success", "category edit");
    return res.render("pages/category/categoryEdit", { category });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updatecategory = async (req, res) => {
  try {
    let id = req.body.id;
    let up = await CategoryModel.findByIdAndUpdate(id, {
      cat_name: req.body.cat_name,
    });
    req.flash("success", "category update");
    return res.redirect("/category");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const activateCategory = async (req, res) => {
  let id = req.query.id;
  let status = 0;
  await CategoryModel.findByIdAndUpdate(id, {
    status: status,
  });
  req.flash("red", "category deactivate <-- ");
  return res.redirect("back");
};

const deactivateCategory = async (req, res) => {
  let id = req.query.id;
  let status = 1;
  await CategoryModel.findByIdAndUpdate(id, {
    status: status,
  });
  req.flash("success", "category activate --> ");
  return res.redirect("back");
};

module.exports = {
  category,
  categoryAdd,
  newCategoryAdd,
  deleteCategory,
  categoryEdit,
  updatecategory,
  activateCategory,
  deactivateCategory,
};
