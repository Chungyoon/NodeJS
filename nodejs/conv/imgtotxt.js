"use strict";

let express = require('express'),
	router = express.Router();

router.get("/img2txt", f_img2txt);
router.post("/imgtotxt", f_imgtotxt);

function f_imgtotxt(req, res, next){
	debugger;
	
try {
	
	const { createWorker } = require('tesseract.js');
	const path = require('path');
	var oBody = req.body,
		oFiles = oBody.files,
		sFile = JSON.parse(oFiles),	
		sImg = sFile[0].IMG_BASE64;
	
	const worker = createWorker({
		logger: m => console.log(m),
	});

	(async () => {
	await worker.load();
	await worker.loadLanguage('eng+kor');
	await worker.initialize('kor');	
	const { data: { text } } = await worker.recognize(sImg);
	console.log(text);
	f_return('S', text, next);
	await worker.terminate();
	})();	
		
	}
	catch(a){

		f_return('E', a, next);
		
	}
}

function f_img2txt(req, res, next){
	debugger;

var Tesseract = require('tesseract.js');

var filename = './sample.jpg';
//filename = 'https://www.jindo.go.kr/uploads/board/2016/07/201701091923481191.jpg';

try {

Tesseract.recognize(
  filename,
  'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
	
  console.log(text);
  
})
	/*
  	Tesseract.recognize(filename, {
        lang: 'kor'
    })
    .progress(function  (p) { console.log('progress', p)  })
    .catch(err => console.error(err))
    .then(function (result) {
        console.log(result.text);
    })
    */

	/*
	Tesseract.recognize(filename, {
		lang: 'kor'
	})
	.catch(function(err){
		debugger;
	console.log(err);
	})
	.then(function (result) {
		debugger;
	    console.log(result.text);
	});
	*/

}
catch(err){
	debugger;
}


/*
var imageToTextDecoder = require('image-to-text');



var file = {
name: 'sample.jpg',
path: './img/'
};



var key = 'ztEX9VMpdh3YbmiGfvlLDA'; //Your key registered from cloudsightapi @ https://cloudsightapi.com
imageToTextDecoder.setAuth(key);
imageToTextDecoder.getKeywordsForImage(file).then(function(keywords){
console.log(keywords);
},function(error){
console.log(error);
});
*/

/*
var tesseract = require('node-tesseract');

tesseract.process('sample.jpg', (err, text) => {
    debugger;
    if(err){
        return console.log("An error occured: ", err);
    }

    console.log("Recognized text:");
    // the text variable contains the recognized text
    console.log(text);
});
*/



	/*
	const tesseract = require("node-tesseract-ocr");

	const config = {
		lang: "eng",
		oem: 1,
		psm: 3,
	}

	tesseract.recognize("sample.jpg", config)
	.then(text => {
		console.log("Result:", text);
	})
	.catch(error => {

		console.log(error.message);
		next(error);
	})
	*/

}


function f_return(retType, retMsg, next){

	let oRetObj = {
		RETTYPE : retType,
		RETMSG : retMsg
	}

	next(oRetObj);

}

module.exports = router;