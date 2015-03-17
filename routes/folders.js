var express = require('express');
var router = express.Router();

var datastore = require("../db/datastore");
var crawler = require("../crawler/simple_crawler");

router.post('/add/', function(request, response){
	var folder = request.body.folder;

	crawler.crawlFolder(folder);

	response.redirect("/");
});

module.exports = router;