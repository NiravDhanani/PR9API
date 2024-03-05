const mongoose = require("mongoose");

const CategoryModel = mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
  },
  exsubcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exsubcategory",
  },
  product: {
    type: String,
    require: true,
  },
  oty: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  discription: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

const Category = mongoose.model("Product", CategoryModel);

module.exports = Category;
