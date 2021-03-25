"use strict";

let express = require('express'),
	router = express.Router(),
	tesseract = require("node-tesseract-ocr");
	

router.get("/ocr", f_get_ocr);
router.post("/ocr", f_get_post);

function f_get_ocr(req, res, next){
	debugger;
	
	let oConfig = {
		binary : "";
	}
	
	tesseract.recognize("image.jpg", config)
	.then(text => {
		console.log("Result:", text);
	})
	.catch(error => {
		console.log(error.message);
	})
	
}

function f_get_post(req, res, next){
	debugger;
	
}

module.exports = router;