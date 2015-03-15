var express = require('express');
var router = express.Router();

var datastore = require("../db/datastore");
var crawler = require("../crawler/simple_crawler");

/* GET home page. */
router.get('/', function(request, response) {
	datastore.getAllFiles(function(error, result){
		if(error)
		{
			var err = new Error('SQLite Error');
    		err.status = 500;
    		response.render("error", {message : "SQLite Error", error: error});
		}
		else
		{
			var files = [];

			result.forEach(function(entry){
				files.push(entry.location + entry.name);
			});

			response.render('index', { files : files });
		}
	});
});

router.post('/add-folder/', function(request, response){
	var folder = request.body.folder;

	crawler.crawlFolder(folder);

	response.redirect("/");
});

module.exports = router;