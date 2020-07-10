"use strict";

var express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	upload = multer(),
	pdf2json = require('pdf2json'),
	PDFParser = new pdf2json(),
	fs = require('fs'),
	path = require('path'),
	//uploadPdf = multer({ dest: 'uploads/' }), //<-- 폴더를 생성해서 파일을 저장한다.
	storage = multer.diskStorage({
		destination : function(req, file, callback){

			var defaultFolderPath = 'pdfFiles/';

			// 폴더 생성 (기존 폴더가 없을 경우만 생성)
			f_mkdir(defaultFolderPath);

			// 저장할 폴더 설정
			callback(null, defaultFolderPath);

		},
		filename : function(req, file, callback){

			// 저장할 파일이름 설정
			var extension = path.extname(file.originalname),
				basename = path.basename(file.originalname, extension),
				fullname =  basename + extension;

				fullname = fullname.trim();

				callback(null, fullname);
		}
	});


var uploadStorage = multer({ storage : storage });

router.get("/pdftest", f_conf_pdf_test);
router.post("/pdftest", f_conf_pdf_test);

router.get("/pdf", f_conv_pdf_to_json);
router.post("/pdf", f_conv_pdf_to_json);

router.get("/pdftojson", upload.any, f_fileUpload_Get);
router.post("/pdftojson", upload.any(), f_fileUpload);
//router.post("/pdfdown", uploadStorage.array('pdffile'), f_pdfDown);
router.get("/pdfdown", uploadStorage.any(), f_pdfDownGet);
router.post("/pdfdown", uploadStorage.any(), f_pdfDown);

function f_conf_pdf_test(req, res, next){
	debugger;

	res.send("pdf test call!!");

}

function f_conv_pdf_to_json(req, res, next){
	debugger;

	res.send("/conv/convert!!");

}

function f_fileUpload_Get(req, res, next){
	debugger;
	
	next({message : "f_fileUpload_Get get!!!"});
}

function f_fileUpload(req, res, next){
	debugger;
	
	var aFiles = req.files;

}

function f_pdfDownGet(req, res, next){
	
	debugger;


}

function f_pdfDown(req, res, next){
	
	debugger;

	/*
	*	PDF File SAVE
	*/

	if (req.files == null) { next({message : '파일이 없습니다.'}); }
    let file = req.files[0];

    if (file == null) { next({message : '파일이 없습니다.'}); }

    let result = {
        originalName : file.originalname,
        size : file.size,
    }

    /*
    *	PDF TO JSON CONVERT
    */
	let extension = path.extname(file.originalname),
		basename = path.basename(file.originalname, extension),
		defaultJsonFolderPath = 'jsonFiles/',
		pdfJsonPath =  defaultJsonFolderPath + basename + '.json';

	// 폴더 생성 (기존 폴더가 없을 경우만 생성)
	f_mkdir(defaultJsonFolderPath);

    PDFParser.on("pdfParser_dataError", function(errData){ 
    	debugger;
    	console.error(errData.parserError);     	
    });    

    PDFParser.on("pdfParser_dataReady", function(pdfData){ 	
    	fs.writeFile(pdfJsonPath, JSON.stringify(pdfData.formImage.Pages), function(error){
    		debugger;
    	
    		if(error == null){

    			console.log('PDF to JSON Convert Success!!');
    			
    			res.status(200);
    			res.setHeader('Content-Type', 'application/json');
    			res.json(JSON.stringify(pdfData.formImage.Pages));
    			//res.end('종료다');
    		}
    		else {
    			console.log(error);
    		}
    		
    		//res.writeHead('200', { 'Content-type': 'text/html;charset=utf8' });
    		//res.writeHead('200');
    		

    	});
    });

    // PDF file Load
    PDFParser.loadPDF(file.path);

    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify(pdfData));

}

function f_mkdir(sPath){

	fs.mkdir(sPath, function(error){

		if(error){
			console.log("already Exists folder!!");
			return;
		}
		else {
			console.log("create folder to " + sPath);
		}
		
	});

}

module.exports = router;