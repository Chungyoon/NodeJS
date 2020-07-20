"use strict";

var express = require('express'),
	app = express(),
	router = express.Router(),
	cors = require('cors'),	
	bodyParser = require('body-parser'),  //<-- post로 던졌을때 http body를 파싱해주는 모듈
	convPdf = require('./conv/pdftojson.js'),
	pdf2html = 	require('./conv/pdftohtml.js');
//var http = require('http');

// server setting		
app.set('port', 1977);

// CORS 설정
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "1mb", extended: false }));

// parse application/json
app.use(bodyParser.json());

// path 등록
app.use("/conv", convPdf);
app.use("/conv", pdf2html);

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
http.createServer(app).listen(app.get('port'), function(res, req){
	
	console.log('hello world!!');
	
	req.send('hello world!!');

	console.log("Server running on port" + app.get('port'));
});
*/

