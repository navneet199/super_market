const mongoose = require('mongoose');
const { Schema } = mongoose;
const categoriesSchema = new mongoose.Schema({
    
    category_name:{
        type : String,
        required : true
    }

});

const categories = mongoose.model('categories',categoriesSchema,'categories');
module.exports = categories;