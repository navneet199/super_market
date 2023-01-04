const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/super_market');  //connect db
const db = mongoose.connection;  //acquire the connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Success db connection');
});





