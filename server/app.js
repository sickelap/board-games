'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var connection = require('socket.io')(server);
var controller = require('./controller');

app.use('/', express.static(__dirname + '/../client'));

controller.handle(connection);

server.listen(process.env.APP_PORT || 3000, function() {
  console.log('Server started!');
});

module.exports = server;
