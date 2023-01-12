const express = require('express');
const router = express.Router();
const app = express();
const db = require('./config/mongoose');
const port = 8000;
let formidable = require('formidable');
let fs = require('fs');
const multer = require('multer');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
var bodyParser=require('body-parser');	
var encoder =  bodyParser.urlencoded({extended:true});
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use('/',require('./routes'));
app.listen(port, function(err){
    if(err)
    {
        console.log(`error : ${err}`);
        return;
    }
    console.log(`Server is running on port:${port}`);
})
