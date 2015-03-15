var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var bodyParser = require('body-parser');

var engine = require('ejs-locals');

var app = express();

var fs = require('fs');
var player = require("./videoplayer.js");
var settings = require("./settings.js");

// view engine setup

var routes = require('./routes/index');

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', settings.webservice.port);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


var server = app.listen(settings.webservice.port, function() {
  console.log('Express server listening on port ' + server.address().port);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    socket.on('add', function (data) {
       player.start(data.file);
    });

    socket.on('enqueue', function (data) {
       player.startPlaylist(data.file);
    });
});

module.exports = app;