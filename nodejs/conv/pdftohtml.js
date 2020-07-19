"use strict";

let express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	upload = multer(),
	pdf2html = require('pdf2html'),
	pdftohtml = require('pdftohtmljs'),
	fs = require('fs'),
	pdfreader = require("pdfreader");


router.get("/pdf2html", f_pdf2html);
//router.get("/pdfhtml", f_pdfhtml);
router.get("/pdfreader", f_pdfReader);


function f_pdfReader(req, res, next){
	debugger;

	var rows = {}; // indexed by y-position

	function printRows() {
		Object.keys(rows) // => array of y-positions (type: float)
		.sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
		.forEach(y => console.log((rows[y] || []).join("#")));
	}

	new pdfreader.PdfReader().parseFileItems("./abab.pdf", function(err, item) {
		

		if (!item || item.page) {
			// end of file, or page
			printRows();			

			if(item == null){
				console.log("- END -");
				return;
			}

			console.log("PAGE:", item.page);

			/*
			if(item != null && item.page != null){
				console.log("PAGE:", item.page);
			}
			*/

			rows = {}; // clear rows for next page
		} 
		else if (item.text) {
		// accumulate text items into rows object, per line
			(rows[item.y] = rows[item.y] || []).push(item.text);
		}
	});

}


function f_pdfhtml(req, res, next){
	debugger;	

	var pdfdata = fs.readFileSync('./abab.pdf', 'binary'),
		pdfbin = Buffer.from(pdfdata);

	const convert = async (file, output, preset) => {
		const converter = new pdftohtml(file, output,{bin : pdfbin});

		// If you would like to tap into progress then create
		// progress handler
		converter.progress((ret) => {
		const progress = (ret.current * 100.0) / ret.total

		console.log(`${progress} %`)
		})
 
		try {
			// convert() returns promise
			await converter.convert(preset || 'ipad')
		} 
		catch (err) {
			console.error(`Psst! something went wrong: ${err.msg}`)
		}

	}	
 
	// call method
	convert('abab.pdf', 'abab.html');	

}

function f_pdf2html(req, res, next) {
	debugger;

	pdf2html.html('abab.pdf', (err, html) => {
	    if (err) {
	        console.error('Conversion error: ' + err)
	    } else {
	        console.log(html)
	    }
	})

}

module.exports = router;