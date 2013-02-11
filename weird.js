var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {

  var htmlSource;

	//if (request.url.match(/#(\w+)/) != "") {
	if (request.url == "/" || request.url == "/index.css") {

	console.log(request.url);

	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './weird.html';

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
			fs.readFile(filePath,'utf8', function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					console.log(content);
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
	else {

		console.log(request.url);
		
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(request.url);
	
	}

}).listen(31135);


console.log('Server running at http://127.0.0.1:31135/');

