'use strict';

var _ = require('lodash');

function Engine() {
  this.games = [];
}

Engine.fn = Engine.prototype;

Engine.fn.start = function() {
  this.io.on('connection', _.bind(this.onConnect, this));
};

Engine.fn.stop = function() {
  this.io.off('connection');
};

/**
 * Initialize wiring
 */
Engine.fn.onConnect = function(connection) {
  connection.on('ping', this.pingHandler.bind(this));
  connection.on('play', this.playGameHandler.bind(this));
  connection.on('ready', this.readyHandler.bind(this));
  connection.on('leave', this.leaveHandler.bind(this));
  connection.on('currentGame', this.currentGameHandler.bind(this));

  this.broadcastGameList();
};

/**
 * request handlers
 */

Engine.fn.pingHandler = function(callback) {
  callback('pong');
};

Engine.fn.playGameHandler = function(data, callback) {
  var game;

  game = this.findGameByPlayerId(data.playerId);
  if (game) {
    return callback(game);
  }

  game = this.findGameById(data._id);
  if (!this.isValidGame(game)) {
    game = this.createGame(data);
  }

  if (!this.isPlayerInGame(game, data.playerId)) {
    game = this.addPlayerToGame(game, data.playerId);
  }

  this.broadcastGameList();
  callback(game);
};

Engine.fn.readyHandler = function(data, callback) {
  var game, result;

  game = this.findGameById(data._id);
  if (!this.isValidGame(game)) {
    //return callback(null);
  }

  if (!this.isPlayerInGame(game, data.playerId)) {
    return callback(null);
  }

  this.togglePlayerReady(game, data.playerId);
  this.broadcastGameList();

  callback(game);
};

Engine.fn.leaveHandler = function(data, callback) {
  var game;

  game = this.findGameByPlayerId(data.playerId);
  if (!game) {
    return callback(null);
  }

  this.removePlayerFromGame(game, data.playerId);

  if (game.players.length === 0) {
    this.removeGame(game);
  } else {
    this.resetGame(game);
  }

  this.broadcastGameList();

  callback();
};

Engine.fn.currentGameHandler = function(data, callback) {
  var game = this.findGameByPlayerId(data.playerId);
  if (game) {
    callback(game);
  } else {
    callback(null);
  }
};

/**
 * private methods
 */

Engine.fn.createGame = function(data) {
  var game = {
    _id: Date.now() + Math.random() + '',
    players: [data.playerId],
    ready: [],
    state: 'NEW',
    public: !!data.public,
    table: this.getEmptyTable()
  };

  this.games.push(game);

  return game;
};

Engine.fn.broadcastGameList = function() {
  this.io.sockets.emit('list:updated', this.games);
};

Engine.fn.findGameByPlayerId = function(playerId) {
  return _.find(this.games, function(game) {
    return _.includes(game.players, playerId);
  });
};

Engine.fn.findGameById = function(gameId) {
  return _.find(this.games, function(game) {
    return game._id === gameId;
  });
};

Engine.fn.isValidGame = function(game) {
  var errors = 0;

  if (!_.isObject(game)) {
    return false;
  }
  errors += _.isNumber(game._id) ? 0 : 1;
  errors += _.isBoolean(game.public) ? 0 : 1;
  errors += _.isArray(game.players) ? 0 : 1;
  errors += _.isArray(game.board) ? 0 : 1;
  errors += _.isArray(game.ready) ? 0 : 1;
  errors += _.isString(game.state) ? 0 : 1;
  errors += (+game._id > 0) ? 0 : 1;

  return errors > 0;
};

Engine.fn.isPlayerInGame = function(game, playerId) {
  return game.players.indexOf(playerId) >= 0;
};

Engine.fn.addPlayerToGame = function(game, playerId) {
  game.players.push(playerId);
  return game;
};

Engine.fn.removePlayerFromGame = function(game, playerId) {
  var idx = game.players.indexOf(playerId);
  game.players.splice(idx, 1);
};

Engine.fn.resetGame = function(game) {
  return Object.assign(game, {
    table: this.getEmptyTable(),
    ready: [],
    state: 'NEW',
    winner: null
  });
};

Engine.fn.removeGame = function(game) {
  _.remove(this.games, game);
};

Engine.fn.togglePlayerReady = function(game, playerId) {
  var idx = game.ready.indexOf(playerId);

  if (idx >= 0) { // remove - set not ready
    game.ready.splice(idx, 1);
  } else { // add - set ready
    game.ready.push(playerId);
  }

  return this.updateGameState(game);
};

Engine.fn.updateGameState = function(game) {
  if (game.state === 'NEW' && game.ready.length === 2) {
    game.state = 'RUNNING';
  }

  var winner = this.getWinner(game);
  if (game.state === 'RUNNING' && winner) {
    game.winner = winner;
    game.state = 'FINISHED';
  }

  return game;
};

Engine.fn.getWinner = function(game) {
  return null;
};

Engine.fn.getEmptyTable = function() {
  return ['', '', '', '', '', '', '', '', ''];
};

module.exports = Engine;
