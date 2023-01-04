const mongoose = require('mongoose');
const { Schema } = mongoose;
const brandsSchema = new mongoose.Schema({
    
    brand_name:{
        type : String,
        required : true
    }

});

const brands = mongoose.model('brands', brandsSchema,'brands');
module.exports = brands;