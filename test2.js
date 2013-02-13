var http = require('http');
var fs = require('fs');
var path = require('path');

var stuff = [ {topic: '-1', vote: '-1', link: 'http://www.google.ca', replies: "[]"} ];

http.createServer(function (request, response) {

	if (request.url == "/cheat") {
		request.on('data', function (data) {
		cheat = data;
		});
		response.end();			
	} else if (request.url == "/cheater") {
	   response.writeHead(200, {'Content-Type': 'text/html'});
	   response.write(cheat, 'utf-8');
	   response.end();			
	} else if(request.url == "/post") {
		console.log('POST');
		var body='';
			request.on('data', function (data) {
			body +=data;
			var random = body.split("&");
			var ins = { topic: random[0].slice(6), vote: random[1].slice(5), link: random[2].slice(5), replies: random[3].slice(8)};
			stuff.push(ins);
			console.log(stuff);
		});
		response.end();
	} else if (request.url == "/get") {
		console.log("GET");
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.end(JSON.stringify( {topics: stuff} ));
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
					   response.write(content, 'utf-8');
					   response.end();
				   }
			   });
		   }
		   else {
			   response.writeHead(404);
			   response.end();
		   }
		});
	};
}).listen(31135);

console.log('Server running at http://127.0.0.1:31135/');

