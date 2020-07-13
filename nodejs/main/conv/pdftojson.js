"use strict";

let express = require('express'),
	router = express.Router(),
	pdf2json = require('pdf2json');
	

/* 
	## URL Path 등록 
		- URL Path별, GET/POST 별 callback function 지정
*/ 

router.post('/pdfjson', f_pdftojson);

/* 
	## callback Funtions 
		- Url Path 별 callback function
*/

function f_pdftojson(req, res, next){

	let oBody = req.body,
		sFile = oBody.files,
		aFiles = JSON.parse(sFile),
		iFileLen = aFiles.length,
		aPromise = [],
		aJsonData = [];
		
	if(iFileLen == 0){
		f_return('E', 'File not Exists!');
		return;
	}
	
	debugger;

	for(var i = 0; i < iFileLen; i++){
		let oFile = aFiles[i];

		var oPromi = new Promise(function (resolve, reject){
			f_ParsePDFtoJson(oFile, iFileLen, resolve, reject);
		});

		aPromise.push(oPromi);

	}

	Promise.all(aPromise).then(function(value){
		debugger;

		var returnJson = JSON.stringify(value);

		res.status(200);
		res.setHeader('Content-Type', 'application/json');
		res.json(returnJson);

		//응답 종료
    	res.end(); 

	})
	.catch(function(errData){
		debugger;

		f_return('E', 'PDF Parse Error!!');

		//응답 종료
    	res.end(); 

		//reject(errData);
	});

    /*
    res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(decode);

	//응답 종료
    res.end(); 
    */

}

function f_ParsePDFtoJson(oFile, iFileLen, resolve, reject){

	let pdfParse = new pdf2json();

	let buf = Buffer.from(oFile.CONTENT, 'hex');

	pdfParse.parseBuffer(buf);

	pdfParse.on("pdfParser_dataError", function(errData){ 

    	reject(errData); // promise error
    	f_return('E', 'PDF Parsing Error!!');   // error response
    	return;
    });

    pdfParse.on("pdfParser_dataReady", function(pdfData){ 	
   		
    	let ojson = JSON.stringify(pdfData.formImage.Pages);
    	let decode = decodeURIComponent(ojson);

    	let convFile = oFile;
    	convFile.CONVJSON = decode;
    	if(convFile.CONTENT){
    		delete convFile.CONTENT;
    	}

    	resolve(convFile);

    	//return decode;

    	/*
    	oJsonData.push(decode);

    	if(oJsonData.length == iFileLen){
    		res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.json(JSON.stringify(oJsonData));

			//응답 종료
		    res.end(); 
    		return;
    	}
		*/
    });    
}

function f_return(retType, retMsg, next){
	let oRetObj = {
		retType : retType,
		retMsg : retMsg
	}

	next(oRetObj);

}

module.exports = router;