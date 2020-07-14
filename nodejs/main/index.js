"use strict";

var express = require('express'),
	app = express(),
	port = 1977,
	router = express.Router(),
	//cors = require('cors'),	
	bodyParser = require('body-parser'),  //<-- post로 던졌을때 http body를 파싱해주는 모듈
	convPdf = require('./conv/pdftojson.js');

// server setting		
//app.set('port', 1977);

// CORS 설정
//app.use(cors());

// http body parser setting
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json());

// path 등록
app.use("/conv", convPdf);

// 오류 처리
// app.use(); 로 등록되지 않은 Path는 무조건 타는 메소드
app.use(function(req, res, next){

	var sUrl = req.url;
	if(sUrl == "/favicon.ico"){
		return;		
	}
	
	let oRetObj = {
		RETTYPE : 'E',
		RETMSG : "[URL Path Error] " + req.url + ' not found.'
	}
	
	next(oRetObj);

});

// new Error로 던지면 이 메소드를 탄다.
app.use(function(err, req, res, next){
	
	let oRetMsg = (err.RETTYPE == null ? {} : err);

	if(err.RETTYPE == null){
		oRetMsg.RETTYPE = "E";
		oRetMsg.RETMSG = "[NODEJS] " + err.toString();
	}
	
	res.send(JSON.stringify(oRetMsg));
	res.end();

});

// 서버 구동
app.listen(port, function(req, res){

	console.log("Server running on port : " + port);

});
