const CategoryModel = require("../model/categoryModel");
const SubcategoryModel = require("../model/SubcategoryModel");
const ExSubcategoryModel = require("../model/ExSubcategoryModel");
const fs = require("fs");
const { default: axios } = require("axios");
const { log } = require("console");

// pages render
const categoryAdd = async (req, res) => {
  try {
    return res.render("pages/category/categoryAdd");
  } catch (err) {
    console.log(err);
    return false;
  }
};


// api routes
// view
const category = async (req, res) => {
  try {
    let category = await CategoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "category List",
      category,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: " category not found ",
    });
  }
};
// create
const newCategoryAdd = async (req, res) => {
  try {
    let data = await CategoryModel.create({
      category: req.body.category,
    });
    console.log(`category add`);
    req.flash("success", "category add");
    return res.status(200).send({
      success: true,
      message: " category Add",
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: " error data not create ",
    });
  }
};
// delete
const deleteCategory = async (req, res) => {
  try {
    let data = await CategoryModel.findByIdAndDelete(req.query.id);
    await SubcategoryModel.deleteMany({ categoryId: req.query.id });
    await ExSubcategoryModel.deleteMany({ categoryId: req.query.id });
    if (data) {
      return res.status(200).send({
        success: true,
        message: "category Delete with all sub and product categories",
      });
    }
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: " category id not found",
    });
  }
};
//edit
const categoryEdit = async (req, res) => {
  try {
    let id = req.query.id;
    let single = await CategoryModel.findById(id);
    return res.status(200).send({
      success: true,
      message: "Category ready to edit",
      single,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: " category id not found",
    });
  }
};
// update
const updatecategory = async (req, res) => {
  try {
    let id = req.query.id;
    let check = await CategoryModel.findById(id);

    if (check) {
      await CategoryModel.findByIdAndUpdate(id, {
        category: req.body.category,
      });

      return res.status(200).send({
        success: true,
        message: " category Update",
      });
    }
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: " category id not found",
    });
  }
};

//  active deactive statuse
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

// category api fetching
const fetchcategory = async (req, res) => {
  try {
    let category = await axios.get("http://localhost:8000/categoryApi");
    return res.render("pages/category/category", {
      category: category.data.category,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const addcategoryApi = async (req, res) => {
  try {
    let data = await axios.post("http://localhost:8000/newCategoryAdd", {
      category: req.body.category,
    });
    return res.redirect("/category");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deletecategoryApi = async (req, res) => {
  try {
    let id = req.query.id;
    let data = await axios.delete(
      `http://localhost:8000/deleteCategory?id=${id}`
    );
    return res.redirect("/category");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const editcategoryApi = async (req, res) => {
  try {
    let id = req.query.id;
    let record = await axios.get(`http://localhost:8000/editCategory?id=${id}`);
    let single = record.data.single;
    return res.render('pages/category/categoryEdit',{single})  
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const updatecategoryApi = async (req,res)=>{
  try{
    let id = req.body.id;
    console.log(id);
    let record = await axios.put(`http://localhost:8000/updatecategory?id=${id}`,{
      category : req.body.category
    });
    return res.redirect('/category')
  } catch (err){
    console.log(err);
    return false;
  }
}



module.exports = {
  category,
  categoryAdd,
  newCategoryAdd,
  deleteCategory,
  categoryEdit,
  updatecategory,
  activateCategory,
  deactivateCategory,
  fetchcategory,
  addcategoryApi,
  deletecategoryApi,
  editcategoryApi,
  updatecategoryApi,
};
