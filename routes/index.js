const express = require('express');
const router = express.Router();
const app = express();
const db = require('../config/mongoose');
const admincontroller = require('../controllers/AdminController');
const categoriescontroller = require('../controllers/CategoriesController');
//const viewadminControllers = require('../controllers/viewadminControllers');
const { body, validationResult } = require('express-validator');
var bodyParser=require('body-parser');	
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
const cookieParser = require("cookie-parser");
app.use(cookieParser());

router.get('/admin',admincontroller.home); 
router.get('/admin-dashboard',admincontroller.admindashboard); 
router.get('/users',admincontroller.users); 

router.get('/categories',categoriescontroller.categories); 
router.get('/add-category',categoriescontroller.addcategories); 
router.post('/save-category',categoriescontroller.savecategories); 
router.get('/edit-category',categoriescontroller.editcategories); 
router.post('/update-category',categoriescontroller.updatecategories); 
router.post('/delete-category',categoriescontroller.deletecategories);


module.exports = router;