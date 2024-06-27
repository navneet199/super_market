const categories = require('../models/categories');
const subcategories = require('../models/sub_categories');

module.exports.subcategories = async function (req, res) {

    var product_subcategories = await subcategories.find({}).populate('category_id').sort({sub_category:'asc'});
	console.log(product_subcategories);
	return res.render('admin/sub_categories',{ product_subcategories: product_subcategories});
}
module.exports.addsubcategory = async function (req, res) {
    var product_categories =await categories.find({});
	return res.render('admin/add_sub_category',{product_categories:product_categories});
}
module.exports.editsubcategory = async function (req, res) {
    var cat_id = req.query.id;
    var product_categories =await categories.find({});
	console.log(product_categories);
    var product_subcategory = await subcategories.find({'_id':cat_id});
    console.log(product_subcategory);

	return res.render('admin/edit_subcategory',{product_categories:product_categories,product_subcategory:product_subcategory});
}
module.exports.savesubcategory = async function (req, res) {
    var category_id = req.body.category_id;
    var sub_category =req.body.sub_category;
    var data = {
		sub_category: sub_category,
        category_id:category_id
	}
    var a= await subcategories.find({});
    console.log(a);

	var sub_categories = await subcategories.find({sub_category:sub_category});
	if (sub_categories.length) {
		res.send('duplicate');
	} else{
		subcategories.create(data, function (err, small) {
			if (err) {
				console.log(err);
			}
			res.send('success');
		});
	}
}
module.exports.updatesubcategory = async function (req, res) {
    var sub_category_name = req.body.sub_category_name;
	var cat_id = req.body.category_id;
	var sub_cat_id = req.body.sub_cat_id;
    var data = {
		sub_category:sub_category_name,
		category_id:cat_id
	}
	var product_subcategories = await subcategories.find(data);
	if(product_subcategories.length){
		res.send('duplicate');
	}else{
		await subcategories.findByIdAndUpdate(sub_cat_id,{sub_category:sub_category_name,category_id:cat_id});
		res.send('success');
	}
}
module.exports.deletesubcategory =function (req, res) {
	var subcat_id = req.body.delete_id;
	subcategories.findByIdAndDelete(subcat_id, function (err) {
		if (err) {
			console.log('error deleting');
			return;
		}
		res.send('success');
	});
	
}
