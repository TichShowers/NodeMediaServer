var settings = require("../settings");

var sqlite3 = require('sqlite3').verbose();
var database = new sqlite3.Database(settings.database.name);

database.serialize(function() {

	database.run("CREATE TABLE if not exists folders (id INTEGER PRIMARY KEY AUTOINCREMENT, location TEXT)");

	database.run("CREATE TABLE if not exists files (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, folder_id INT REFERENCES folders ON DELETE CASCADE)");
});

module.exports = database;