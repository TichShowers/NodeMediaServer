var path = require("path");

var database = require("./database");

var getAllFiles = function(callback){
	database.all("SELECT F.id, F.name, D.location FROM files F JOIN folders D ON F.folder_id = D.id", callback);
};

var addFolder = function(folder, callback) {
	database.run("INSERT INTO folders (location) VALUES ($folder)", { $folder: folder }, callback);	
};

var addFile = function(filename, foldername, callback) {
	database.all("SELECT id FROM folders WHERE location = $name", { $name : foldername}, function(error, result){
		var id = result[0].id;

		database.run("INSERT INTO files (name, folder_id) VALUES ($file, $folderid)", {$file : filename, $folderid: id}, callback);	
	});
}

var getFilePath = function(id, callback){
	database.all("SELECT F.name, D.location FROM files F JOIN folders D ON F.folder_id = D.id WHERE F.id = $id", { $id : id }, function(error, result) {
		if(result.length === 1) {
			var file = result[0];

			callback(error, path.join(file.location, file.name))
		}

		else{
			callback(error);
		}
	});
};

var getAllFolders = function(callback){
	database.all("SELECT id, location FROM folders", callback);
};

var deleteFolder = function(id, callback){
	database.run("DELETE FROM folders WHERE id = $id", {$id : id}, callback);
};

module.exports.getAllFiles = getAllFiles;
module.exports.addFolder = addFolder;
module.exports.addFile = addFile;
module.exports.getFilePath = getFilePath;
module.exports.getAllFolders = getAllFolders;
module.exports.deleteFolder = deleteFolder;