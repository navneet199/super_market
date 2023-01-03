const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
//mongoose.connect('mongodb://localhost:27017/crudmongo');
uniqueValidator.defaults.type = 'mongoose-unique-validator';
const { Schema } = mongoose;

const crudSchema = new mongoose.Schema({
    
    /* sname:{
		 required : true,
         type : String,
		 unique: true
    }, */
	
	created: {
    type: Date,
    default: Date.now
  },
	
	
	 sname: {
    type: String,
    validate: {
      validator: async function(sname) {
        const user = await this.constructor.findOne({ sname });
        if(user) {
          if(this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: props => 'The specified user name is already in use.'
    },
    required: [true, 'User email required']
  },
	
    saddress:{
        type:String,
        required :true,
		//unique: [true, 'Address should be unique'],
		//uniqueCaseInsensitive: true
    },
	 sphone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}/.test(v);
      },
      message: props => `${props.value} is not a valid 10 digit number!`
    },
    required: [true, 'User phone number required']
  },
    sclass: [{ type: Schema.Types.ObjectId, ref: 'studentclass'}]

});
crudSchema.plugin(uniqueValidator);

const crud = mongoose.model('crud',crudSchema);
module.exports = crud;