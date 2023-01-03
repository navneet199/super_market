const mongoose = require('mongoose');
const { Schema } = mongoose;
 const studentclassSchema = new mongoose.Schema({
    
    classname:{
        type : String,
        required : true
    }

});

const studentclass = mongoose.model('studentclass',studentclassSchema,'studentclass');
module.exports = studentclass;