const mongoose = require('mongoose')

const CategoryModel = mongoose.Schema({
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
    },
    subcat_name : {
        type: String,
        require : true
    },
});

const Category = mongoose.model('subcategory',CategoryModel);

module.exports = Category;