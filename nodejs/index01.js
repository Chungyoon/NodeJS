// basicServer.js
var oHttp = require('http'),
	oUrl = require('url'),
	oExp = require('express'),
	oMulti = require('multipart');

oHttp.createServer(function (req, res) {

	debugger;

	var sUrl = req.url,
		sQuery = oUrl.parse(sUrl, true).query,
		sMethod = req.method;
	
	if(sUrl == "/favicon.ico"){
		return;		
	}
	
	switch (sMethod){
		case 'GET' :
			break;

		case 'POST' :
			break;

		default:
			break;
	}

    res.writeHead(200, {'Content-Type': 'text/html'});

    res.end('Hello World');

}).listen(1977);

console.log('Server running at http://127.0.0.1:1977/');