var express = require('express'),
	router = express.Router();

router.get("/pdf", f_conv_pdf_to_json);
router.post("/pdf", f_conv_pdf_to_json);

function f_conv_pdf_to_json(req, res){
	debugger;

	res.send("/pdftojson/convert!!");

}

module.exports = router;