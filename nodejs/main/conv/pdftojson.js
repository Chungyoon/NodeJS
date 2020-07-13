"use strict";

let express = require('express'),
	router = express.Router(),
	pdf2json = require('pdf2json');
	

/* 
	## URL Path 등록 
		- URL Path별, GET/POST 별 callback function 지정
*/ 

router.post('/pdfmulti', f_pdfmulty);

/* 
	## callback Funtions 
		- Url Path 별 callback function
*/

function f_pdfmulty(req, res, next){
	debugger;

	let oBody = req.body,
		sFile = oBody.files,
		aFiles = JSON.parse(sFile),
		iFileLen = aFiles.length,
		oJsonData = [];
		
	if(iFileLen == 0){
		f_return('E', 'File not Exists!');
		return;
	}

	for(var i = 0; i < iFileLen; i++){
		let oFile = aFiles[i];
		f_ParsePDFtoJson(oFile, iFileLen);
	}

    /*
    res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.json(decode);

	//응답 종료
    res.end(); 
    */

}

function f_ParsePDFtoJson(oFile, iFileLen){

	let pdfParse = new pdf2json();
		//oJsonData = [];

	let buf = Buffer.from(oFile.CONTENT, 'hex');

	pdfParse.parseBuffer(buf);

	pdfParse.on("pdfParser_dataError", function(errData){ 
    	f_return('E', 'PDF Parsing Error!!');     	
    	return;
    });

    pdfParse.on("pdfParser_dataReady", function(pdfData){ 	
    	debugger;

    	let ojson = JSON.stringify(pdfData.formImage.Pages);
    	let decode = decodeURIComponent(ojson);

    	oJsonData.push(decode);

    	if(oJsonData.length == iFileLen){
    		res.status(200);
			res.setHeader('Content-Type', 'application/json');
			res.json(JSON.stringify(oJsonData));

			//응답 종료
		    res.end(); 
    		return;
    	}

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