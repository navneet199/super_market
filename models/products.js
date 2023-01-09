const mongoose = require('mongoose');
const { Schema } = mongoose;
const productsSchema = new mongoose.Schema({
    
    product_name:{
        type : String,
        required : true
    },
    product_qty:{
        required : true
    },
    product_category:
        { type: Schema.Types.ObjectId, ref: 'categories'},
    product_sub_cat:{type: Schema.Types.ObjectId, ref: 'subcategories'},
    product_brand:{type: Schema.Types.ObjectId, ref: 'brands'},
    product_price:{
        type:Number,
        required:true
    },
    status:{
        required:true
    },
    product_views:{
        default:0
    },
    product_image:{
        type : String,
        required : true

    },
    product_description:{
        type : String,
        required : true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

const products = mongoose.model('products', productsSchema,'products');
module.exports = products;