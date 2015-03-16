var express = require('express');
var router = express.Router();

var player = require("../videoplayer");

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

var doResponse = function(response) {
	response.end(JSON.stringify({ status: "ok" }));
};

module.exports = router;