const categories = require('../models/categories');
const subcategories = require('../models/sub_categories');
const brands = require('../models/brands');
const products = require('../models/products');

module.exports.products = async function (req, res) {

    var product_lists = await products.find({}).populate(['product_category','product_sub_cat','product_brand']).sort({created_at:'desc'});
    console.log(product_lists);
    console.log(product_lists[1].product_sub_cat.sub_category);
	return res.render('admin/products',{ products: product_lists});
}
module.exports.addproducts = async function (req, res) {
    var product_categories = await categories.find({});
    var product_brands = await brands.find({});
    console.log('add product');

	return res.render('admin/add_product',{categories:product_categories,brands:product_brands});
}

module.exports.getsubcategories = async function (req, res) {
    var cat_id = req.body.cat_id;
    var subcat_dropdown = "";
    if(cat_id != ""){
        var prod_sub_cats = await subcategories.find({category_id:cat_id});
        prod_sub_cats.forEach(function(prod_sub_cat){
            subcat_dropdown +="<option value = '"+prod_sub_cat._id+"'>"+prod_sub_cat.sub_category+"</option>";
            console.log(subcat_dropdown);
        })
    }
    res.send(subcat_dropdown);
}
module.exports.editproduct = async function (req, res) {
    var product_id = req.query.id; 

    var product_categories = await categories.find().sort({category_name:'asc'});
    var product_brands = await brands.find({}).sort({brand_name:'asc'});
    var product = await products.find({_id:product_id});
	return res.render('admin/edit_product',{categories:product_categories,brands:product_brands,product:product});
}
module.exports.saveproduct = async function(req, res){
    var title= req.body.product_title;
    var description = req.body.product_desc;
    var prod_cat = req.body.product_cat;
    var sub_cat = req.body.product_sub_cat;
    var prod_brand = req.body.product_brand;
    var price = req.body.product_price;
    var qty = req.body.product_qty;
    var status = req.body.product_status;
    var data = {
        product_name:title,
        product_qty:qty,
        product_category:prod_cat,
        product_sub_cat:sub_cat,
        product_brand:prod_brand,
        product_price:price,
        status:status,
        product_description:description
    }
    var product = await products.find({product_name:title});
    if (product.length) {
        	res.send('duplicate');
        } else{
    products.create(data, function (err, small) {
        		if (err) {
        			console.log(err);
        		}
        		res.send('success');
        	});
        }
    //res.send('success');


    // var category_name = req.body.category_name;
    // var data = {
	// 	category_name: category_name
	// }

	// var category = await categories.find(data);
	// if (category.length) {
	// 	res.send('duplicate');
	// } else{

	// 	categories.create(data, function (err, small) {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		res.send('success');
	// 	});
	// }
}
module.exports.updateproduct = async function (req, res) {
    var product_id = req.body.product_id;
    var product_title = req.body.product_title;
    var product_cat = req.body.product_cat;
    var product_subcat = req.body.product_sub_cat;
    var product_brand = req.body.product_brand;
    var product_desc =req.body.product_desc;
    var product_price = req.body.product_price;
    var product_qty = req.body.product_qty;
    var product_status = req.body.product_status;
    var data = {
		product_name:product_title,
        product_qty:product_qty,
        product_category:product_cat,
        product_sub_cat:product_subcat,
        product_brand:product_brand,
        product_price:product_price,
        product_description:product_desc,
        status:product_status
	}
	// var product = await products.find({product_name:product_title});
	// if(product.length){
	// 	res.send('duplicate')

	// }else{
        console.log(data);
		await products.findByIdAndUpdate(product_id,data);
		res.send('success');
	//}
}
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
