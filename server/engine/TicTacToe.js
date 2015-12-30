'use strict';

var _ = require('lodash');

function Engine() {}

Engine.fn = Engine.prototype;

Engine.fn.setSocket = function(socket) {
  this.socket = socket;
};

Engine.fn.setStore = function(store) {
  this.store = store;
};

Engine.fn.start = function() {
  this.socket.on('connection', _.bind(this._onConnect, this));
};

Engine.fn.stop = function() {
  this.io.off('connection');
};

/**
 * Initialize wiring
 */
Engine.fn._onConnect = function(connection) {
  this.connection.on('list', _.bind(this._getGamesList, this));
};

/**
 * Return list og all games in the store
 *
 * @param cb callback to be called with result
 */
Engine.fn._getGamesList = function(cb) {
  cb(this.store.findAllGames());
};

/**
 * Create new game in the store and return it
 *
 * @param cb callback to be called with result
 */
Engine.fn._createGame = function(cb) {
  var game = this.store.add({
    players: [],
    state: 'INITIAL', // READY, RUNNING, ENDED
    board: this._getPristineBoard(),
    stones: {
      'X': null,
      'O': null
    }
  });

  cb(game);
};

/**
 * @param gameId game ID
 * @param playerId player ID
 * @param callback callback to be called with game object or error
 */
Engine.fn._joinGame = function(gameId, playerId, callback) {
  var store = this.store;

  var checkIfPlayerCanJoin = function(game) {
    return new Promise(function(resolve, reject) {
      if (game.players.length === 2) {
        reject('game is full');
      }
      if (game.players.indexOf(playerId) !== -1) {
        reject('player already in the game');
      }

      resolve(game); // pass-thru
    });
  };

  var addPlayer = function(game) {
    return new Promise(function(resolve) {
      var stones = _.filter(game.stones, function(stone) {
        return game.stones[stone] === null;
      });
      var stone = stones[Math.random(Math.floor() * stones.length)];
      game.players.push(playerId); // add player
      game.stones[stone] = playerId; // assign random stone to a player
      resolve(game);
    });
  };

  this.findGameById(gameId)
    .then(checkIfPlayerCanJoin)
    .then(addPlayer)
    .then(store.save)
    .then(callback)
    .catch(function(error) {
      callback({
        error: error
      });
    });
};

/**
 * Remove player from the players list and mar game as ended
 */
Engine.fn._leaveGame = function(gameId, playerId, callback) {
  this.store.findGameById(gameId);
};

/**
 * Return array representing empty game board
 */
Engine.fn._getPristineBoard = function() {
  return ['', '', '', '', '', '', '', '', ''];
};

module.exports = Engine;
