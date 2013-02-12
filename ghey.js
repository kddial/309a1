var sys = require ('sys'),
url = require('url'),
qs = require('querystring');
var http = require('http');
var fs = require('fs');
var path = require('path');
var $ = require('jquery');

http.createServer(function (req, res) {
   
	if (req.url == '/') {
		fs.readFile('ghey.html', function(error, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data, 'utf8');})
	}
	else if(req.method=='POST') {

			var body='';
			req.on('data', function (data) {
				body +=data;
				console.log(body);
			});
			req.on('end',function(){
				
				// This is the data from request
				var POST =  qs.parse(body);
				console.log(POST);
			});

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(" Response from POST: " + qs.parse(body));

	}
	else if(req.method=='GET') {
	  console.log("get");
		// This is the data from request
		var url_parts = url.parse(req.url,true);
		console.log(url_parts.query);

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(" Response from GET: ");
		
	}
	
}).listen(1337, "127.0.0.1");



console.log('Server running at http://127.0.0.1:1337/');
