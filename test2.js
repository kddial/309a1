var http = require('http');
var fs = require('fs');
var path = require('path');

var stuff = [];

http.createServer(function (request, response) {

  if(request.method=='POST') {
		console.log('POST');
		var body='';
			request.on('data', function (data) {
			body +=data;
			var random = body.split("&");
			var ins = { topic: random[0].slice(6), vote: random[1].slice(5), replies: random[2].slice(8)};
			stuff.push(ins);
			console.log(stuff);
		});
		response.end();
	//} else if(request.method=='GET') {
	//	console.log("GET");
	} else {
   var filePath = '.' + request.url;
   if (filePath == './')
       filePath = './test2.html';

   var extname = path.extname(filePath);
   var contentType = 'text/html';
   switch (extname) {
       case '.js':
           contentType = 'text/javascript';
           break;
       case '.css':
           contentType = 'text/css';
           break;
   }

   path.exists(filePath, function(exists) {

       if (exists) {
           fs.readFile(filePath, function(error, content) {
               if (error) {
                   response.writeHead(500);
                   response.end();
               }
               else {
                   response.writeHead(200, {'Content-Type': contentType });
                   response.end(content, 'utf-8');
               }
           });
       }
       else {
           response.writeHead(404);
           response.end();
       }
   });
   }

}).listen(31135);

console.log('Server running at http://127.0.0.1:31135/');

