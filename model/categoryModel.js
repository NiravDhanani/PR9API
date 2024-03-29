const mongoose = require('mongoose')

const CategoryModel = mongoose.Schema({
   category : {
        type: String,
        require : true
    },
    status : {
        type  :Number,
        default : 1,
    }
});

const Category = mongoose.model('category',CategoryModel);

module.exports = Category;