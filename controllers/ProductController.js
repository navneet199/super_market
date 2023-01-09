const categories = require('../models/categories');
const subcategories = require('../models/sub_categories');
const brands = require('../models/brands');

// module.exports.categories = async function (req, res) {

//     var product_categories = await categories.find({}).sort({category_name:'asc'});
//     console.log(product_categories);

// 	return res.render('admin/categories',{ product_categories: product_categories});
// }
module.exports.addproducts = async function (req, res) {
    var product_categories = await categories.find({});
    var product_brands = await brands.find({});
    console.log('add product');

	return res.render('admin/add_product',{categories:product_categories,brands:product_brands});
}

module.exports.getsubcategories = async function (req, res) {
    var cat_id = req.body.cat_id;
    var prod_sub_cats = await subcategories.find({category_id:cat_id});
    var subcat_dropdown = "";
    prod_sub_cats.forEach(function(prod_sub_cat){
        subcat_dropdown +="<option value = '"+prod_sub_cat._id+"'>"+prod_sub_cat.sub_category+"</option>";
        console.log(subcat_dropdown);
       
    });
    res.send(subcat_dropdown);
   
	//return res.render('admin/add_product',{categories:product_categories,brands:product_brands});
}


// module.exports.editcategories = async function (req, res) {
//    var cat_id = req.query.id;
//     var category = await categories.find({'_id':cat_id});
//     console.log(category);

// 	return res.render('admin/edit_category',{category:category});
// }
// module.exports.savecategories = async function (req, res) {
//     var category_name = req.body.category_name;
//     var data = {
// 		category_name: category_name
// 	}

// 	var category = await categories.find(data);
// 	if (category.length) {
// 		res.send('duplicate');
// 	} else{

// 		categories.create(data, function (err, small) {
// 			if (err) {
// 				console.log(err);
// 			}
// 			res.send('success');
// 		});
// 	}
// }
// module.exports.updatecategories = async function (req, res) {
//     var category_name = req.body.cat_name;
// 	var cat_id = req.body.cat_id;
//     var data = {
// 		category_name:category_name
// 	}
// 	var category = await categories.find(data);
// 	if(category.length){
// 		res.send('success')

// 	}else{
// 		await categories.findByIdAndUpdate(cat_id, data);
// 		res.send('success');

// 	}
// }
// module.exports.deletecategories =function (req, res) {
// 	var cat_id = req.body.delete_id;
// 	categories.findByIdAndDelete(cat_id, function (err) {
// 		if (err) {
// 			console.log('error deleting');
// 			return;
// 		}
// 		res.send('success');
// 	});
	
// }
