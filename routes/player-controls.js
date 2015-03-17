var express = require('express');
var router = express.Router();

var player = require("../videoplayer");
var datastore = require("../db/datastore");

router.post('/play', function(request, response){
	player.play();
	doResponse(response);
});

router.post('/pause', function(request, response){
	player.pause();
	doResponse(response);
});

router.post('/stop', function(request, response){
	player.stop();
	doResponse(response);
});

router.post('/exit', function(request, response){
	player.exit();
	doResponse(response);
});

router.post('/next', function(request, response){
	player.next();
	doResponse(response);
});

router.post('/previous', function(request, response){
	player.previous();
	doResponse(response);
});

router.post('/exit', function(request, response){
	player.exit();
	doResponse(response);
});

router.post('/enqueue/:id', function(request, response){
	var id = request.params.id;

	datastore.getFilePath(id, function(error, file) {
		player.startPlaylist(file);
		doResponse(response);
	});
});

router.post('/start/:id', function(request, response){
	var id = request.params.id;

	datastore.getFilePath(id, function(error, file) {
		player.start(file);
		doResponse(response);
	});
});

var doResponse = function(response) {
	response.end(JSON.stringify({ status: "ok" }));
};

module.exports = router;