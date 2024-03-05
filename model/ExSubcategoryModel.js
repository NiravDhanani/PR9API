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
  product: {
    type: String,
    require: true,
  },
  qty: {
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

const Category = mongoose.model("Exsubcategory", CategoryModel);

module.exports = Category;
