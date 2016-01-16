/// <reference path="../typings/tsd.d.ts" />
import * as express from 'express';
import * as socketio from 'socket.io';
import * as http from 'http';
import {GameServer} from './gameServer';

var app = express();
var server = http.createServer(app);
var connection = socketio(server);
var gameServer = new GameServer(connection);

app.use(express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/../client'));

server.listen(process.env.APP_PORT || 3000, () => {
  console.log('Server started!')
});

export var App = server;
