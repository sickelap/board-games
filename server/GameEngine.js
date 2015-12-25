'use strict';

function GameEngine(socket, store) {
  this.socket = socket;
  this.store = store;
}

GameEngine.prototype.broadcastGameList = function() {
  var games = this.store.toJSON();

  this.socket.emit('game:update', games);
};

GameEngine.prototype.sendGameList = function(playerId) {
  var games;

  if (playerId) {
    games = this.store.filter(function(game) {
      return game.isPlayer(playerId);
    }).toJSON();
  } else {
    games = this.store.toJSON();
  }

  this.socket.emit('game:list', games);
};

GameEngine.prototype.sendGameDetails = function(gameId) {
  var game = this.store.find(gameId);
  
  this.socket.emit('game:get', game);
};

GameEngine.prototype.createGame = function(cb) {
  var game = this.store.createGame();

  cb('vienas');
};

GameEngine.prototype.joinGame = function(gameId, playerId) {
  var game = this.store.find(gameId);
  var success = false;

  if (game) {
    success = game.addPlayer(playerId);
  }

  this.socket.emit('game:join', {
    success: success,
    game: game
  });
};

GameEngine.prototype.makeMove = function(gameId, playerId, action) {
  var game = this.store.find(gameId);
  var result = {
    success: false,
    game: null
  };

  if (game) {
    result.success = game.makeMove(playerId, action);
    result.game = game;
  }

  this.socket.emit('game:move', result);
};

module.exports = GameEngine;
