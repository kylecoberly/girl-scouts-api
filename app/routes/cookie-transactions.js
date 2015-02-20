var express = require('express');
var router = express.Router();

router.get('/:transaction_id', function(request, response, next) {
	request.db.get("cookieTransaction").find(request.params.transaction_id, function(error, result){
		if (result){
			response.status(200).json({cookieTransaction: result});
		} else {
			response.sendStatus(404);
		}
	});
});
router.get('/', function(request, response, next) {
	request.db.get("cookieTransaction").find({}, function(error, result){
		if (result){
			response.status(200).json({cookieTransaction: result});
		} else {
			response.sendStatus(404);
		}
	});
});

router.post('/', function(request, response, next) {
	request.db.get("cookieTransaction").insert(request.body.cookieTransaction, function(error, result){
		response.status(201).json({cookieTransaction: result});
	});
});
router.put('/:transaction_id', function(request, response, next) {
	request.db.get("cookieTransaction").updateById(request.params.transaction_id, request.body.user, function(){
		request.body.cookieTransaction._id = request.params.transaction_id;
		response.status(200).json({cookieTransaction: request.body.user});
	});
});
router.delete('/:transaction_id', function(request, response, next) {
	request.db.get("cookieTransaction").remove(request.params.transaction_id, function(){
		response.sendStatus(204);
	});
});

module.exports = router;
