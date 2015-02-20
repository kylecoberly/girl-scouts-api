var express = require('express');
var router = express.Router();

router.get('/:stock_id', function(request, response, next) {
	request.db.get("cookieStock").find(request.params.stock_id, function(error, result){
		if (result){
			response.status(200).json({cookieStock: result});
		} else {
			response.sendStatus(404);
		}
	});
});
router.get('/', function(request, response, next) {
	request.db.get("cookieStock").find({}, function(error, result){
		if (result){
			response.status(200).json({cookieStock: result});
		} else {
			response.sendStatus(404);
		}
	});
});

router.post('/', function(request, response, next) {
	request.db.get("cookieStock").insert(request.body.cookieStock, function(error, result){
		response.status(201).json({cookieStock: result});
	});
});
router.put('/:stock_id', function(request, response, next) {
	request.db.get("cookieStock").updateById(request.params.stock_id, request.body.user, function(){
		request.body.cookieStock._id = request.params.stock_id;
		response.status(200).json({cookieStock: request.body.user});
	});
});
router.delete('/:stock_id', function(request, response, next) {
	request.db.get("cookieStock").remove(request.params.stock_id, function(){
		response.sendStatus(204);
	});
});

module.exports = router;
