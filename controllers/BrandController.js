//const categories = require('../models/categories');
const brands = require('../models/brands');
module.exports.brands = async function (req, res) {

    var product_brands = await brands.find({}).sort({brand_name:'asc'});
    console.log(product_brands);

	return res.render('admin/brands',{brands: product_brands});
}
module.exports.addbrands = function (req, res) {

	return res.render('admin/add_brand');
}
module.exports.editbrand = async function (req, res) {
   var brand_id = req.query.id;
    var product_brand = await brands.find({'_id':brand_id});

	return res.render('admin/edit_brand',{product_brand:product_brand});
}
module.exports.savebrand = async function (req, res) {
    var brand_name = req.body.brand_name;
    var data = {
		brand_name: brand_name
	}

	var brand = await brands.find(data);
	if (brand.length) {
		res.send('duplicate');
	} else{

		brands.create(data, function (err, small) {
			if (err) {
				console.log(err);
			}
			res.send('success');
		});
	}
}
module.exports.updatebrand = async function (req, res) {
    var brand_name = req.body.brand_name;
	var brand_id = req.body.brand_id;
    var data = {
		brand_name:brand_name
	}
	var product_brand = await brands.find(data);
	if(product_brand.length){
		res.send('duplicate')

	}else{
		await brands.findByIdAndUpdate(brand_id, data);
		res.send('success');

	}
}
module.exports.deletebrand =function (req, res) {
	var brand_id = req.body.delete_id;
	brands.findByIdAndDelete(brand_id, function (err) {
		if (err) {
			console.log('error deleting');
			return;
		}
		res.send('success');
	});
	
}
