var http = require('http');
var fs = require('fs');
var path = require('path');

var topic_list = [];

http.createServer(function (request, response) {

	if (request.url == "/post") {
		console.log("POST");
		request.setEncoding()
		request.on('data', function (data) {
			var topicjson = eval("(" + data + ')');
			//console.log(random.topics);
			topic_list = topicjson.topics;
		});
		response.end();
	} else if (request.url == "/add") {
		console.log("ADD");
		topic_list = [
			  	{
					"topic": "Topic 0",
					"vote": 0,
					"link": "url.com",
					"replies": []
				},
				{
					"topic": "Topic 1",
					"vote": 1,
					"link": "http://www.google.ca/",
					"replies": [ 
						{
							"reply": "Reply 1a", 
							"vote": 0, 
							"replies": []
						} 
					]
				},
				{
					"topic": "Topic 2",
					"vote": 99,
					"link": "123",
					"replies" : [
						{
							"reply": "Reply 2a", 
							"vote": 2, 
							"replies": []
						},
						{
							"reply": "Reply 2b", 
							"vote": 5, 
							"replies": [
								{
									"reply": "Reply 2ba", 
									"vote": 10, 
									"replies": []
								}
							]
						}
					]
				}
				]
		//console.log(topic_list);
		response.end()
	} else if (request.url == "/clear") {
		topic_list = [];
		//console.log(topic_list);
		response.end();	
	} else if (request.url == "/get") {
		console.log("GET");
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.end(JSON.stringify( {topics: topic_list} ));
	} else {
	   var filePath = '.' + request.url;
	   if (filePath == './')
		   filePath = './index.html';
		
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

