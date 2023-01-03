const express = require('express');
const router = express.Router();
const app = express();
const db = require('../config/mongoose');
const crudControllers = require('../controllers/CrudControllers');
const adminControllers = require('../controllers/AdminController');
//const viewadminControllers = require('../controllers/viewadminControllers');
const { body, validationResult } = require('express-validator');
var bodyParser=require('body-parser');	
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//router.get('/admin',adminControllers.admin); 
//router.get('/admin',crudControllers.); 

router.get('/homing',crudControllers.home); 
router.get('/add',crudControllers.add); 
router.get('/edit',crudControllers.edit); 
router.get('/delete-inline',crudControllers.deleteinline); 
router.post('/adddb', body('sname').isEmail(),
crudControllers.addDb); 





router.post('/update',crudControllers.update); 
router.get('/shortlisted',crudControllers.shortlisted); 
router.post('/getfilteredstudents',crudControllers.getfilteredstudents); 

module.exports = router;