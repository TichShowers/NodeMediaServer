var fs = require("fs");
var path = require("path");

var datastore = require("../db/datastore");
var settings = require("../settings");

var extensions = settings.files.extensions;

var crawlFolder = function(folder, callback) {
	if(path.isAbsolute(folder)) {
		fs.exists(folder, function() {
			datastore.addFolder(folder, function(error){
				splitFilesFromDirectory(folder, function(files, folders){
					files.forEach(function(file){
						datastore.addFile(file, folder, function(error){
							if(error) { 
								console.log(error); 
							}
						});
					});
				});
			});
		});
	}
};

var isAllowedExtension = function(file){
	return extensions.indexOf(path.extname(file)) !== -1;
};

var splitFilesFromDirectory = function(folder, callback) {
	fs.readdir(folder, function(error, list){
		var files = [];
		var folders = [];

		for(var i = 0; i < list.length; i++)
		{
			var stats = fs.lstatSync(path.join(folder, list[i]));
			if(stats.isFile() && isAllowedExtension(path.join(folder, list[i])))
			{
				files.push(list[i]);
			}
			if(stats.isDirectory())
			{
				folders.push(list[i]);
			}
		}

		callback(files, folders);
	});
};

module.exports.crawlFolder = crawlFolder;
module.exports.splitFilesFromDirectory = splitFilesFromDirectory;