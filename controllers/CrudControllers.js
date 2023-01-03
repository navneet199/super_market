const crud = require('../models/crud');
const studentclass = require('../models/studentclass');
const { body, validationResult } = require('express-validator');


module.exports.admin = function (req, res) {

	console.log('res');
	//return res.render('admin/index');

	// var classes = await studentclass.find({});
	// crud.find().populate('sclass').sort().limit().exec().then(students => {

	// 	return res.render('index', { students: students, sid:null, classes: classes });


	// });


}


module.exports.home = function (req, res) {
	return res.render('admin/index');
}

module.exports.admindashboard = function (req, res) {

	console.log('home');
	return res.render('admin/dashboard');

	// var classes = await studentclass.find({});
	// crud.find().populate('sclass').sort().limit().exec().then(students => {

	// 	return res.render('index', { students: students, sid:null, classes: classes });


	// });


}

module.exports.users = function (req, res) {

	return res.render('admin/users');
}
module.exports.categories = function (req, res) {

	return res.render('admin/categories');
}


module.exports.getfilteredstudents = async function (req, res) {

	var filter_name = req.body.filter_name;
	var filter_phone = req.body.filter_phone;
	var filter_class = req.body.filter_class;
	var filter_date_from = req.body.filter_date_from;
	var filter_date_to = req.body.filter_date_to;
	var order_by_name = req.body.order_by_name;
	var order_by_date = req.body.order_by_date;
	var student_limit = req.body.student_limit;

	var filter_data = {};
	var sort_data = {};
	var limit_data ="";

	if (filter_name != "" && typeof (filter_name) != "undefined") {
		var filter_name_trimed = filter_name.trim();

		filter_data.sname = { '$regex': filter_name_trimed, '$options': 'i' };
	}
	if (filter_phone != "" && typeof (filter_phone) != "undefined") {
		var filter_phone_trimed = filter_phone.trim();

		filter_data.sphone = { '$regex': filter_phone_trimed, '$options': 'i' };
	}
	if (filter_class != "" && typeof(filter_class) != "undefined") {

		filter_data.sclass = filter_class;
	}
	

	if (order_by_date != "" && typeof(order_by_date) != "undefined") {

		sort_data.created = order_by_date;
	}
	if (order_by_name != "" && typeof(order_by_name) != "undefined") {

		sort_data.sname = order_by_name;
	}


	if (student_limit != "" && typeof(student_limit) != "undefined") {

		limit_data = student_limit;
	}


	if(filter_date_from != "" && typeof(filter_date_from) != "undefined"){
		const date_from = new Date(filter_date_from);
		date_from.setUTCHours(0,0,0,0);
		filter_data.created = { $gte: date_from};


	}

	if (filter_date_to != "" && typeof(filter_date_to) != "undefined") {
		const date_to = new Date(filter_date_to);
		date_to.setUTCHours(23,59,59,999);
		filter_data.created = {$lte: date_to };

	}

	if (filter_date_from != "" && typeof (filter_date_from) != "undefined" && filter_date_to != "" && 
	typeof (filter_date_to) != "undefined") {

		const date_from = new Date(filter_date_from);
		date_from.setUTCHours(0,0,0,0);
		const date_to = new Date(filter_date_to);
		date_to.setUTCHours(23,59,59,999);
		
		filter_data.created = {$gte: date_from, $lte: date_to};

	}

	console.log(filter_data);
	console.log(sort_data);
	
	 crud.find(filter_data).collation({locale: "en" }).populate('sclass').limit(limit_data).sort(sort_data).exec().then(students=>{

		var student_data= "";
		var sr_no =1;
		var student_count= students.length;
		 for (var i = 0; i < students.length; i++) {
			 student_data += "<tr>" +
				 "<td>" + sr_no + "</td>" +
				 "<td class='capitalize'>" + students[i].sname + "</td>" +
				 "<td class='capitalize'>" + students[i].saddress + "</td>" +
				 "<td class='capitalize'>" + students[i].sclass[0].classname + "</td>" +
				 "<td>" + students[i].sphone + "</td>" +
				 "<td>" + students[i].created.toLocaleString("nl-NL", {
					 year: 'numeric',
					 month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
				 }) + "</td>" +

				 "<td><a href='edit?id=" + students[i]._id + "'>Edit</a>" +
				 "<a  href='delete-inline?id=" + students[i]._id + "'>Delete</a> " +
				/*  "<a href='#' class='add_shortlist' data-sid='" + students[i]._id + "'>Shortlist</a></td>" + */

				 "</tr>";
			 sr_no++
		 }

	 res.send(student_data+"@@"+student_count);
})
}


module.exports.add = async function (req, res) {

	var classes = await studentclass.find({});

	return res.render('add', { classes: classes });

}

module.exports.edit = async function (req, res) {
	var id = req.query.id;
	var classes = await studentclass.find({});
	console.log(classes);
	crud.find({ _id: id }, function (err, student) {


		console.log(student);

		return res.render('edit', { student: student, classes: classes });
	});

}

module.exports.update = async function (req, res) {

	var sid = req.body.sid;
	var sname1 = req.body.sname;
	var sphone1 = req.body.sphone;
	var saddress1 = req.body.saddress;
	var sclass1 = req.body.sclass;

	var data = {
		sname: sname1,
		saddress: saddress1,
		sphone: sphone1,
		sclass: sclass1
	};
	console.log(data);
	//const opts = { runValidators: true };
	await crud.findByIdAndUpdate(sid, data)

	res.redirect("/home");

}

module.exports.addDb = function (req, res) {
	// https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go
	// https://stackabuse.com/form-data-validation-in-nodejs-with-express-validator/

	// body('username').isEmail(),
	// // password must be at least 5 chars long
	// body('password').isLength({ min: 5 }),
	// (req, res) => {
	//   // Finds the validation errors in this request and wraps them in an object with handy functions
	//   const errors = validationResult(req);
	//   if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array() });
	//   }
  
	const errors = validationResult(req);

console.log(errors);




	var sname1 = req.body.sname;
	var sphone1 = req.body.sphone;
	var saddress1 = req.body.saddress;
	var sclass1 = req.body.sclass;
	function pad2(number) {

		return (number < 10 ? '0' : '') + number

	}
	var dt = new Date();
	var post_date = dt.getFullYear() + '-' + pad2(dt.getMonth() + 1)
		+ '-' + pad2(dt.getDate());




	var data = {
		sname: sname1,
		saddress: saddress1,
		sphone: sphone1,
		sclass: sclass1,
	
	}
	console.log(data);
	crud.create(data, function (err, small) {
		if (err) {
			var data = err.message.split(':');
			console.log(data);
			console.log(data[2]);
			console.log(err.message);
			console.log(typeof (err.message));

			res.json(err.message.saddress);
		}	 // return err;

		res.redirect("/home");

	});


}

module.exports.shortlisted = async function (req, res) {

	var stu_id_string = req.cookies.stu_id;
	console.log(stu_id_string);
	if (stu_id_string) {
		var stu_id_array = stu_id_string.split(',');
		console.log(stu_id_array);

		const students = await crud.find({ _id: { $in: stu_id_array } });
		console.log(students);

		return res.render('shortlisted', { students: students });
	}
	var students = null;
	return res.render('shortlisted', { students: students });

}



module.exports.deleteinline = function (req, res) {
	var id = req.query.id;
	console.log(id);

	crud.findByIdAndDelete(id, function (err) {
		if (err) {
			console.log('error deleting');
			return;
		}
		return res.redirect('back');
	});

}


