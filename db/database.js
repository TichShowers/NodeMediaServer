var settings = require("../settings");

var sqlite3 = require('sqlite3').verbose();
var database = new sqlite3.Database(settings.database.name);

database.serialize(function() {

	database.run("CREATE TABLE if not exists folders (id INTEGER PRIMARY KEY AUTOINCREMENT, location TEXT)");

	database.run("CREATE TABLE if not exists files (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, folder_id INT REFERENCES folders ON DELETE CASCADE)", testMethod);
});

module.exports = database;


var testMethod = function(){
	//TESTING
	/*var statement = database.prepare("INSERT INTO folders (location) VALUES (?)");

	var folder = "V:\\TEST\\";

	statement.run(folder);

	statement.finalize();

	database.all("SELECT id FROM folders", function(error, result){

		var id = result[0].id;

		var files = ["Ika.mkv", "Nami.mkv", "Azu.mkv"];

		statement = database.prepare("INSERT INTO files (name, folder_id) VALUES (?,?)");	

		files.forEach(function(file){
			statement.run(file, id);
		});

		statement.finalize();
	});*/
};