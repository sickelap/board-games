'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require('socket.io')(server);
var config = require('./config');

app.use('/', express.static(__dirname + '/../client'));

var store = config.getStore();
var engine = config.getEngine();

engine.setSocket(socket);
engine.setStore(store);
engine.start();

server.listen(process.env.APP_PORT || 3000);

module.exports = server;
