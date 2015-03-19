var express = require('express');
var router = express.Router();

var datastore = require("../db/datastore");
var crawler = require("../crawler/simple_crawler");

router.post('/add', function(request, response){
	var folder = request.body.folder;

	crawler.crawlFolder(folder);

	response.redirect("/");
});

router.get('/view/:id', function(request, response){
	var id = request.params.id;

	datastore.getFilesInFolders(id, function(error, result){
		if(error)
		{
			response.end(JSON.stringify({ error: "SQLite error" }));
		}
		else
		{
			response.end(JSON.stringify(result));
		}
	});
});

router.post('/delete/:id', function(request, response){
	var id = request.params.id;

	datastore.deleteFolder(id, function(error){
		response.end(JSON.stringify({status : "ok" }));
	});
});

module.exports = router;