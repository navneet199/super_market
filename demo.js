const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/crudmongo');
const { Schema } = mongoose;
var assert = require('assert');

const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, 'Why no bacon?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea'],
    required: function() {
      return this.bacon > 3;
    }
  }
});
const Breakfast = mongoose.model('Breakfast', breakfastSchema);

const badBreakfast = new Breakfast({
  eggs: 2,
  bacon: 0,
  drink: 'Milk'
});
let error = badBreakfast.validateSync();
//console.log(error);
 assert.equal(error.errors['eggs'].message,
  'Too few eggs');
assert.ok(!error.errors['bacon']);
var res = assert.equal(error.errors['drink'].message,
  '`Milk` is not a valid enum value for path `drink`.');
  console.log(res);

badBreakfast.bacon = 5;
badBreakfast.drink = null;

error = badBreakfast.validateSync();
assert.equal(error.errors['drink'].message, 'Path `drink` is required.');

badBreakfast.bacon = null;
error = badBreakfast.validateSync();
assert.equal(error.errors['bacon'].message, 'Why no bacon?');