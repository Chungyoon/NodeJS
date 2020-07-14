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
		aPromise = [];
		
	if(iFileLen == 0){
		f_return('E', 'File not Exists!', next);
		return;
	}

	for(var i = 0; i < iFileLen; i++){

		let oFile = aFiles[i];
		
		if(oFile.MIME != "application/pdf"){
			f_return('E', 'Only PDF files are allowed!', next);
			return;
		}
		
		let oPromi = new Promise(function (resolve, reject){
			f_ParsePDFtoJson(oFile, iFileLen, next, resolve, reject);
		});

		aPromise.push(oPromi);

	}

	Promise.all(aPromise).then(function(value){

		let returnJson = JSON.stringify(value);
		
		returnJson = decodeURIComponent(returnJson);
		
		f_return("S", returnJson, next);

	})
	.catch(function(errData){

		f_return('E', errData.parserError, next);

	});

}

function f_ParsePDFtoJson(oFile, iFileLen, next, resolve, reject){

	let pdfParse = new pdf2json(),
		buf = Buffer.from(oFile.CONTENT, 'hex');
	
	pdfParse.parseBuffer(buf);

	// PDF를 JSON으로 파싱 성공한 경우 실행되는 callback Function
    pdfParse.on("pdfParser_dataReady", function(pdfData){ 	
	
		// PDF에서 Text 정보만 추출	
   		let aExtractTxt = f_extractTextData(pdfData.formImage.Pages);

   		// 파일 정보 구성
    	let convFile = oFile;
    	convFile.CONVJSON = aExtractTxt;

    	// 파일의 Content 데이터 삭제 (데이터 용량 때문)
    	if(convFile.CONTENT){
    		delete convFile.CONTENT;
    	}

    	resolve(convFile);

    }); 

    // PDF를 JSON으로 파싱 실패한 경우 실행되는 callback Function
    pdfParse.on("pdfParser_dataError", function(errData){ 

    	reject(errData); // promise error

    	return;
		
    });   
}

function f_return(retType, retMsg, next){

	let oRetObj = {
		RETTYPE : retType,
		RETMSG : retMsg
	}

	next(oRetObj);

}

function f_extractTextData(aPages){	

	let aTexts = [],
		iPageLen = aPages.length;
		
	for(var i = 0; i < iPageLen; i++){
		let aText = aPages[i].Texts,
			iTextLen = aText.length;

		for(var j = 0; j < iTextLen; j++){
			let oText = aText[j].R[0].T;
			aTexts.push(oText);
		}	
	}

	return aTexts;
}

module.exports = router;