"use strict";

var GamesCollection = require('./entities/GameCollection');
var socket;
var store;

function startEngine(socket) {
  store = new GamesCollection([]);

  store.on('change:state add remove', function() {
    socket.broadcast('game:update', store.toJSON());
  });

  socket.on('game:list', function(playerId) {
    var games = store.toJSON();

    if (playerId) {
      games = games.filter(function(game) {
        return game.isPlayer(playerId);
      });
    }

    socket.emit('game:list', games);
  });

  socket.on('game:get', function(gameId) {
    var game = store.find(id);
    socket.emit('game:get', game);
  });

  socket.on('game:create', function() {
    var game = store.createGame();
    socket.emit('game:create', game);
  });

  socket.on('game:join', function(gameId, playerId) {
    var game = store.find(gameId);
    var success = false;

    if (game) {
      success = game.addPlayer(playerId);
    }

    socket.emit('game:join', {
      success: success,
      game: game
    });
  });

  socket.on('game:move', function(gameId, playerId, action) {
    var game = store.find(gameId);
    var result = {
      success: false,
      game: null
    };

    if (game) {
      result.move = game.makeMove(playerId, action);
      result.game = game;
    }

    socket.emit('game:move', result);
  });
}

function Game(io) {
  io.on('connection', startEngine);
}

module.exports = Game;
