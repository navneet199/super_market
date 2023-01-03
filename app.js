const express=require('express');
var bodyParser=require('body-parser');
var encoder =  bodyParser.urlencoded({extended:true});
var uc = require('upper-case'); 
const app=express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
app.use('/css', express.static('css'));
app.use(expressSession({
secret:"thisissecret",
saveUninitialized:false, 
resave:false 

}))
const fastestValidator = require('fastest-validator');
const v = new fastestValidator();
app.use('/assets',express.static('assets'));
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
//app.use('/public', express.static('public'));
app.use('/',require('./routes'));
app.set('view engine','ejs')
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
    multipleStatements: true
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})

const checkUrl=function(req,res,next){
console.warn("current route is:",req.originalUrl);
next();
}
app.use(checkUrl);
app.get('/user',function(req, res){
   // res.send("hello express about");
   res.render("index")
})
app.get('/home',function(req, res){
    
   /*  var sql = "SELECT sid,sname,saddress,sphone,cname FROM student left join studentclass on studentclass.cid= student.sclass";
      con.query(sql, function (err,result) {
        if (err) throw err;
    
        res.render("home",{items:result});
      }) */
	  //res.write('helo');
	  res.end(uc.upperCase('Hello World!'));
   
})
app.get('/updatedata/:sid?',function(req, res){
  
    var sid=req.query.sid; 
    console.log("sid:"+sid);
    if(sid != undefined){
      var sql="SELECT * FROM student WHERE sid='"+sid+"';";
      var sql2="SELECT * FROM studentclass";
      con.query(sql+sql2,[], function(err,results) {
        if (err) throw err;
        console.log(results[0]); 
        console.log(results[1]);
    
       res.render("update",{item:results[0],item2:results[1]});  
      })
    }
    else{
      res.render("update",{item:sid});  
    }
     
})
app.get('/delete',function(req, res){
  
   var aid=req.query.id;
   console.log(aid) ;

   var sql = "DELETE  FROM student WHERE sid= '" + aid + "'";
   con.query(sql, function (err,result) {
     if (err) throw err;
     console.log(result);
    // res.json(result[0]);
    res.redirect('/home');     
   })
})
app.get('/add', function(req, res){
	
	res.render("add");
  /* var sql = "SELECT * FROM studentclass";
  con.query(sql, function (err,result) {
    if (err) throw err;
    res.render("add",
    {items:result,
      snameerror:req.session.snameerror,
      saddresserror:req.session.saddresserror,
    success:req.session.success});
  })
  req.session.snameerror = null,
  req.session.saddresserror = null,
  req.session.success = null */
})
app.get('/edit',function(req, res){
  var result;
  var aid=req.query.id;
  console.log(aid) ;
  var sql = "SELECT * FROM student where sid='"+aid+"';";
  var sql2 = "SELECT * FROM studentclass;";
  con.query(sql+sql2,[] , function(err,results) {
    if (err) throw err;
    console.log(results[0]);    
    console.log(results[1]);
    res.render("edit",{items:results[0],doc:results[1]});
  })  
  
})
app.post('/update',function(req, res){
  var sid=req.body.sid;
  var sname=req.body.sname;
  var saddress=req.body.saddress;
  var sphone= req.body.sphone;
  var sclass=req.body.sclass;
  console.log(sname+saddress+sphone);
  var sql = "UPDATE student set sname='"+sname+"',saddress= '"+saddress+"',sphone = '"+sphone+"',sclass = '"+sclass+"' WHERE sid='"+sid+"'";
  con.query(sql, function (err,result) {
    if (err) throw err;
   // console.log(result);
   // res.json(result[0]);
    res.redirect("/home");
  })
     
    });

 const schema = {
      sname: { type: "string", min:5, max:10,required:true}, // required
      saddress: { type: "string", optional: true, min:5, max:10 }
  };
  
app.post('/adddata',function(req, res){
  var sname = req.body.sname;
  var saddress=req.body.saddress;
  var sphone= req.body.sphone;
  var sclass=req.body.sclass;
  var married=req.body.married;
  if(married === 'married') {
    married=1;

  }
  else{
    married = 0;
  }
 // console.log(sname+saddress+sphone);
  const check = v.compile(schema);
  const result2 = check({
   sname:sname,
   saddress:saddress,
  });
  console.log(result2);
 // console.log(result[0].message);
  //console.log(result[1].message)
  
  if(result2===true){
    req.session.success = true
   
   /* var sql = "INSERT INTO  student(sname,saddress,sphone,sclass,married) VALUES ('"+sname+"','"+saddress+"','"+sphone+"','"+sclass+"','"+married+"')";
    con.query(sql, function (err,result) {
      if (err) throw err;
     // console.log(result);
     // res.json(result[0]);
      
    }) */
    res.redirect("/add?sdf="+result2); 
   
  }else{
    req.session.snameerror=result2[0].message
    req.session.saddresserror=result2[1].message
    req.session.success= false
    console.log(result2[0].message);
    res.redirect("/add?sd="+result2[0].message);
}     

    }); 
  
app.listen(4505);