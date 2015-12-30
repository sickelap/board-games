'use strict';

var _ = require('lodash');

function Engine() {
  this.games = [];
}

Engine.fn = Engine.prototype;

Engine.fn.setSocket = function(socket) {
  this.io = socket;
};

Engine.fn.setStore = function(store) {
  this.store = store;
};

Engine.fn.start = function() {
  this.io.on('connection', _.bind(this._onConnect, this));
};

Engine.fn.stop = function() {
  this.io.off('connection');
};

/**
 * Initialize wiring
 */
Engine.fn._onConnect = function(connection) {
  connection.on('ping', this._ping.bind(this));
  connection.on('list', this._listGames.bind(this));
  connection.on('create', this._createGame.bind(this));
  connection.on('join', this._joinGame.bind(this));
  connection.on('leave', this._leaveGame.bind(this));
  connection.on('play', this._playGame.bind(this));
  connection.on('move', this._makeMove.bind(this));

  this._broadcastGameList();
};

Engine.fn._ping = function(callback) {
  callback('pong');
};

Engine.fn._listGames = function(callback) {
  callback(this.games);
};

Engine.fn._createGame = function(data, callback) {
  var game = {
    _id: Date.now() + Math.random() + '',
    players: [data.playerId],
    state: 'NEW',
    public: !!data.public
  };

  this.games.push(game);
  this._broadcastGameList();

  callback(game);
};

Engine.fn._joinGame = function(data, callback) {
  var game = _.findWhere(this.games, {
    _id: data.gameId
  });
  if (!game) {
    callback(null);
  }

  if (game.players.indexOf(data.playerId) === -1) {
    game.players.push(data.playerId);
    this._broadcastGameList();
  }

  callback(game);
};

Engine.fn._leaveGame = function(data, callback) {
  var game = _.findWhere(this.games, {_id: data.gameId});
  if (!game) {
    return callback(false);
  }

  var playerIdx = game.players.indexOf(data.playerId);
  if (playerIdx !== -1) {
    game.players.splice(playerIdx, 1);
    this._broadcastGameList();
  }

  callback(true);
};

Engine.fn._playGame = function(data, callback) {
  callback();
};

Engine.fn._makeMove = function(data, callback) {
  callback();
};

Engine.fn._broadcastGameList = function() {
  this.io.sockets.emit('list:updated', this.games);
};

module.exports = Engine;
