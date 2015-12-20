"use strict";

var socket;

function startGame() {
  socket.emit('gameStarted', arguments);
}

function onConnect(s) {
  socket = s;
  socket.emit('news', { hello: 'world' });
  socket.on('startGame', startGame);
}

function Game(io) {
  io.on('connection', onConnect);
}

module.exports = Game;
