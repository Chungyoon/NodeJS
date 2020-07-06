var express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	upload = multer(),
	pdf2json = require('pdf2json'),
	PDFParser = new pdf2json(),
	fs = require('fs'),
	path = require('path'),
	uploadPdf = multer({ dest: 'uploads/' }), //<-- 폴더를 생성해서 파일을 저장한다.
	storage = multer.diskStorage({
		destination : function(req, file, callback){
			debugger;
			callback(null, 'pdfFiles/');
		},
		filename : function(req, file, callback){
			debugger;
			var extension = path.extname(file.originalname),
				basename = path.basename(file.originalname, extension),
				fullname =  basename + extension;

				fullname = fullname.trim();

				callback(null, fullname);
		}
	});

	var uploadStorage = multer({ storage : storage });

	/*
		폴더를 지정해서 파일을 저장하는 방법 
		https://victorydntmd.tistory.com/39 참조
	*/

router.get("/pdf", f_conv_pdf_to_json);
router.post("/pdf", f_conv_pdf_to_json);
router.post("/pdftojson", upload.any(), f_fileUpload);
router.post("/pdfdown", uploadStorage.array('dgpdf'), f_pdfDown);

function f_conv_pdf_to_json(req, res, next){
	debugger;

	res.send("/conv/convert!!");

}

function f_fileUpload(req, res){
	debugger;
	
	var aFiles = req.files;

}

function f_pdfDown(req, res){

	/*
	*	PDF File SAVE
	*/
    let file = req.files[0];

    let result = {
        originalName : file.originalname,
        size : file.size,
    }

    res.json(result);


    /*
    *	PDF TO JSON CONVERT
    */
	let extension = path.extname(file.originalname),
		basename = path.basename(file.originalname, extension),
		pdfJsonPath = 'jsonFiles/' + basename + '.json';

    PDFParser.on("pdfParser_dataError", function(errData){ 
    	debugger;
    	console.error(errData.parserError); 
    });    

    PDFParser.on("pdfParser_dataReady", function(pdfData){ 	
    	fs.writeFile(pdfJsonPath, JSON.stringify(pdfData), function(error){
    		debugger;
    		if(error == null){

    			console.log('PDF to JSON Convert Success!!');
    			
    			res.setHeader('Content-Type', 'application/json');
    			res.send(JSON.stringify(pdfData));
    		}
    		else {
    			console.log(error);
    		}


    	});
    });

    // PDF file Load
    PDFParser.loadPDF(file.path);

    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify(pdfData));

}

module.exports = router;