import * as express from 'express';
import * as socketio from 'socket.io';
import * as http from 'http';
import {GameServer} from './gameServer';

var app = express();
var server = http.createServer(app);
var connection = socketio(server);
var gameServer = new GameServer(connection);

app.use('/', express.static(__dirname + '/../client'));

server.listen(3000);

export var App = server;
