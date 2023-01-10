var http = require('http');
http.createServer(function(req,res){
res.write("helo nodemon asd")
res.end();
}).listen(4002);