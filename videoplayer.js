var spawn = require('child_process').spawn;
var net = require('net');
var settings = require("./settings.js");

var client = null;

var active = false;

var looping = false;
var repeating = false;
var shuffling = false;
var isPlaying = false;

var createPlayer = function(file){
  var player = spawn(settings.vlc.binary, ['-I rc --rc-host=\"localhost:' + settings.vlc.port + '\" --rc-quiet','--fullscreen', '--play-and-exit', '--no-loop', file]);

  var client = net.createConnection(settings.vlc.port, "localhost");

  client.on('connect', function() {
      active = true;
      var looping = false;
      var repeating = false;
      var shuffling = false;
  });


  client.on('data', function(data) {
      console.log("VLC reports: \n" + data.toString());
  });

  client.on('end', function() {
      active = false;
  });

  return client;
};

var play = function(){ if(active) client.write("play\n"); };
var pause = function() { if(active) client.write("pause\n"); };
var next = function() { if(active) client.write("next\n"); };
var previous = function() { if(active) client.write("prev\n"); };
var stop = function() { if(active) client.write("stop\n"); };
var clearPlaylist = function() { if(active) client.write("clear\n"); };
var printPlaylist = function() { if(active) client.write("playlist\n"); };
var printHelp = function() { if(active) client.write("help\n"); };

var exit = function() {if(active) client.write("add vlc://quit\n");};

var enableLooping = function() {
  if(active) { client.write("loop on\n"); looping = true; }
};
var enableRepeating = function() {
  if(active) { client.write("repeating on\n"); repeating = true; }
};
var enableShuffling = function() {
  if(active) { client.write("random on\n"); shuffling = true; }
};

var enableLooping = function() {
  if(active) { client.write("loop on\n"); looping = true; }
};
var enableRepeating = function() {
  if(active) { client.write("repeating on\n"); repeating = true; }
};
var enableShuffling = function() {
  if(active) { client.write("random on\n"); shuffling = true; }
};

var disableLooping = function() {
  if(active) { client.write("loop off\n"); looping = true; }
};
var disableRepeating = function() {
  if(active) { client.write("repeating off\n"); repeating = true; }
};
var disableShuffling = function() {
  if(active) { client.write("random off\n"); shuffling = true; }
};

var toggleLooping = function() {
  if(active) { client.write("loop\n"); looping = !looping; }
};
var toggleRepeating = function() {
  if(active) { client.write("repeating\n"); repeating = !repeating; }
};
var toggleShuffling = function() {
  if(active) { client.write("random\n"); shuffling = !shuffling; }
};

var addToPlaylist = function(file) { client.write("enqueue " + file + "\n"); };
var addToPlaylistAndPlay = function(file) { client.write("add " + file + "\n"); };

var start = function(file) {
  if(active){
    addToPlaylistAndPlay(file);
  }
  else {
    client = createPlayer(file);
  }
};

var startPlaylist = function(file) {
  if(active){
    addToPlaylist(file);
  }
  else {
    client = createPlayer(file);
  }
};

module.exports.start = start;
module.exports.startPlaylist = startPlaylist;

module.exports.play = play;
module.exports.pause = pause;
module.exports.next = next;
module.exports.previous = previous;
module.exports.stop = stop;
module.exports.exit = exit;

module.exports.isPlaying = function() { return isPlaying; };