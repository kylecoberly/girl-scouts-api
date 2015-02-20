var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
	request.db.get("transaction").find({}, function(error, result){
		if (result){
			response.status(200).json({transaction: result});
		} else {
			response.sendStatus(404);
		}
	});
});

router.get('/:transaction_id', function(request, response, next) {
	request.db.get("transaction").find(request.params.transaction_id, function(error, result){
		if (result){
			response.status(200).json({transaction: result});
		} else {
			response.sendStatus(404);
		}
	});
});

router.post('/', function(request, response, next) {
	request.db.get("transaction").insert(request.body.transaction, function(error, result){
		response.status(201).json({transaction: result});
	});
});
router.put('/:transaction_id', function(request, response, next) {
	request.db.get("transaction").updateById(request.params.transaction_id, request.body.user, function(){
		request.body.transaction._id = request.params.transaction_id;
		response.status(200).json({transaction: request.body.user});
	});
});
router.delete('/:transaction_id', function(request, response, next) {
	request.db.get("transaction").remove(request.params.transaction_id, function(){
		response.sendStatus(204);
	});
});

module.exports = router;
