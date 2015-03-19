var express = require('express');
var router = express.Router();

var datastore = require("../db/datastore");
var crawler = require("../crawler/simple_crawler");

/* GET home page. */
router.get('/', function(request, response) {
	datastore.getAllFiles(function(error, files){
		datastore.getAllFolders(function(error2, folders){
			if(error)
			{
				var err = new Error('SQLite Error');
	    		err.status = 500;
	    		response.render("error", {message : "SQLite Error", error: error});
			}
			else
			{
				response.render('index', { files : files, folders : folders });
			}
		});
	});
});

module.exports = router;