const mongoose = require('mongoose');
const { Schema } = mongoose;
const subcategoriesSchema = new mongoose.Schema({
    sub_category:{
        type : String,
        required : true
    },
    category_id: { type: Schema.Types.ObjectId, ref: 'categories'},
    created_at :{ 
        type: Date,
        default:Date.now()
    }
});

const subcategories = mongoose.model('subcategories',subcategoriesSchema,'subcategories');
module.exports = subcategories;