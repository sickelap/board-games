'use strict';

var Backbone = require('backbone');

var GameModel = Backbone.Model.extend({
  board: [],

  defaults: {
    size: 3,
    board: [],
    players: [],
    winner: null,
    state: 'REGISTERING', // ENUM: {"REGISTERING","RUNNING","ENDED"}
  },

  initialize: function() {
    this.set('id', this.cid + Date.now());
    this._createBoard();
    this.on('change:players', this._onPlayerJoin, this);
  },

  addPlayer: function(playerId) {
    if (!this._canAddPlayer()) {
      return false;
    }

    players.push(playerId);

    this.set({players: players});
    return true;
  },

  makeMove: function(playerId, action) {
    var cell;

    if (this.get('state') !== 'RUNNING') {
      return false;
    }

    cell = this.get('board')[action.x][action.y];

    if (cell === null) {
      cell = playerId;

      if (this._isWinner(playerId, action)) {
        this.set({
          winner: playerId,
          status: 'ENDED'
        });
      }

      return true;
    }

    return false;
  },

  _canAddPlayer: function() {
    var players = this.get('players');
    var state = this.get('state');

    return (players.length === 2 || state !== 'REGISTERING');
  },

  _createBoard: function() {
    var row, col, board = [], size = this.get('size');

    for (row = 0; row < size; row++) {
      if (!board[row]) {
        board[row] = [];
      }
      for (col = 0; col < size; col++) {
        board[row][col] = null;
      }
    }

    this.set({board: board});
  },

  _onPlayerJoin: function() {
    if (this.get('players').length === 2) {
      this.set('state', 'RUNNING');
    }
  },

  _isWinner: function(player, lastMove) {
    var checkTable = [
      [[1, 2], [4, 8], [3, 6]],
      [[0, 2], [4, 7]],
      [[0, 1], [4, 6], [5, 8]],
      [[4, 5], [0, 6]],
      [[3, 5], [0, 8], [2, 6], [1, 7]],
      [[3, 4], [2, 8]],
      [[7, 8], [2, 4], [0, 3]],
      [[6, 8], [1, 4]],
      [[6, 7], [0, 4], [2, 5]]
    ];
    var lastMoveIndex = lastMove.x + lastMove.y * 3;

    var board = this.get('board');
    for (var i = 0; i < winLines[lastMove].length; i++) {
      var line = winLines[lastMove][i];
      var y1 = parseInt(line[0] / 3, 10);
      var x1 = line[0] % 3;
      var y2 = parseInt(line[1] / 3, 10);
      var x2 = line[1] % 3;
      if (player === board[x1][y1] && player === board[x2][y2]) {
        return true;
      }
    }
    return false;
  }
});

module.exports = GameModel;
