// basicServer.js
var oHttp = require('http'),
	oUrl = require('url');

oHttp.createServer(function (req, res) {

	debugger;

	var sUrl = req.url,
		sQuery = oUrl.parse(sUrl, true).query,
		sMethod = req.method;

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