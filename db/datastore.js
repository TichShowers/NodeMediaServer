var database = require("./database");

var getAllFiles = function(callback){
	database.all("SELECT F.id, F.name, D.location FROM files F JOIN folders D ON F.folder_id = D.id", function(error, result){
		callback(error, result);
	});
};

var addFolder = function(folder, callback) {
	database.run("INSERT INTO folders (location) VALUES ($folder)", { $folder: folder }, function(error) {
		callback(error);
	});	
};

var addFile = function(filename, foldername, callback) {
	database.all("SELECT id FROM folders WHERE location = $name", { $name : foldername}, function(error, result){
		var id = result[0].id;

		database.run("INSERT INTO files (name, folder_id) VALUES ($file, $folderid)", {$file : filename, $folderid: id}, function(error) {
			callback(error);
		});	
	});
}

module.exports.getAllFiles = getAllFiles;
module.exports.addFolder = addFolder;
module.exports.addFile = addFile;