const express = require('express');
const app = express();
const router = express.Router();

/********** Server Init Settings **********/
var server = app.listen(1977, function () {
	
	debugger;
	
	var host = server.address().address;
	var port = server.address().port;
  
	console.log('Server is working : PORT - ',port);
	
});
/*********** End of Server Setting ********/

app.use(function(req, res, next){
	debugger;
	throw new Error(req.url + ' not found.');
});

app.use(function(err, req, res, next){
	console.log(err);
	res.send(err.message);
});
  
// URL이 없을 경우.  
app.get('/', function (req, res) {
	debugger;
	res.send('Hello World!');
});

// PDF를 JSON으로 전환
app.get('/pdftojson', f_pdfToJson);

// 라우팅 연습
router.route('/pdf').post(f_pdf);

/********** function **********/
function f_pdfToJson(req, res){
	
	debugger;
	
	res.send("pdfToJson Success!!");
	
}
function f_pdf(req, res){
	debugger;

	res.send("라우팅 테스트!!");
}


