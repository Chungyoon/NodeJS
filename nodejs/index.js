var express = require('express'),
	app = express(),
	router = express.Router();
	
var http = require('http');

// server setting		
app.set('port', 1977);
app.use(router);

app.use('/', routes);
app.use('/users', users);


출처: https://urban41.tistory.com/10 [URBAN41]

// 오류 처리
app.use(function(req, res, next){
	debugger;
	throw new Error(req.url + ' not found.');
});

app.use(function(err, req, res, next){
	console.log(err);
	res.send(err.message);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Server running on port" + app.get('port'));
});

