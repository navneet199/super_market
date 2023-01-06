const categories = require('../models/categories');
const subcategories = require('../models/sub_categories');

module.exports.subcategories = async function (req, res) {

    var product_subcategories = await subcategories.find({}).populate('category_id').sort({sub_category:'asc'});
    console.log(product_subcategories);

	return res.render('admin/sub_categories',{ product_subcategories: product_subcategories});
}
module.exports.addsubcategory = async function (req, res) {
    var product_categories =await categories.find({});
    console.log(product_categories);

	return res.render('admin/add_sub_category',{product_categories:product_categories});
}
module.exports.editsubcategories = async function (req, res) {
   var cat_id = req.query.id;
    var category = await categories.find({'_id':cat_id});
    console.log(category);

	return res.render('admin/edit_category',{category:category});
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
