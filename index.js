const express = require('express');
const router = express.Router();
const app = express();
const db = require('./config/mongoose');
const port = 8000;
//const crudControllers = require('./controllers/CrudControllers');
//const viewadminControllers = require('../controllers/viewadminControllers');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
var bodyParser=require('body-parser');	
var encoder =  bodyParser.urlencoded({extended:true});
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/',require('./routes'));
//app.use('/user',require('./routes/users'));

//var db2 = require("../models");
//const Product = require('./models/Product');
//const Review = require('../models/Review');





app.get("/products", function(req,res) {
  Product.find({})
  .then(function(dbProducts) {
    res.json(dbProducts);
  })
  .catch(function(err) {
    res.json(err);
  })
});


app.listen(port, function(err){
    if(err)
    {
        console.log(`error : ${err}`);
        return;
    }
    console.log(`Server is running on port:${port}`);
})
