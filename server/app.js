var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
require('./GameController')(io);

app.use('/', express.static(__dirname + '/../client'));

server.listen(3000);

