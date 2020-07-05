var express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	upload = multer(),
	pdf2json = require('pdf2json'),
	PDFParser = new pdf2json(),
	fs = require('fs');
	//upload = multer({ dest: 'uploads/' }); <-- 폴더를 생성해서 파일을 저장한다.

	/*
		폴더를 지정해서 파일을 저장하는 방법 
		https://victorydntmd.tistory.com/39 참조
	*/
	
router.get("/pdf", f_conv_pdf_to_json);
router.post("/pdf", f_conv_pdf_to_json);
router.post("/pdftojson", upload.any(), f_fileUpload);

function f_conv_pdf_to_json(req, res){
	debugger;

	res.send("/conv/convert!!");

}

function f_fileUpload(req, res){
	debugger;
	
	var aFiles = req.files;




}

module.exports = router;