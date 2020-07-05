var express = require('express'),
	app = express(),
	router = express.Router(),	
	convPdf = require('./conv/pdftojson.js');
	
//var http = require('http');

// server setting		
app.set('port', 1977);

app.use("/conv", convPdf);

// 오류 처리
// app.use(); 로 등록되지 않은 Path는 무조건 타는 메소드
app.use(function(req, res, next){

	debugger;

	var sUrl = req.url;
	if(sUrl == "/favicon.ico"){
		return;		
	}

	throw new Error(req.url + ' not found.');

});

// new Error로 던지면 이 메소드를 탄다.
app.use(function(err, req, res, next){
	
	debugger;

	console.log(err);
	res.send(err.message);

});

// 서버 구동
app.listen(1977, function(req, res){

	console.log("Server running on port : " + app.get('port'));

});

/*
http.createServer(app).listen(app.get('port'), function(){
	console.log("Server running on port" + app.get('port'));
});
*/

