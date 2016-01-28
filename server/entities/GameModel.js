'use strict';

var _ = require('lodash');
var Backbone = require('backbone');
var boardConfig = require('./tictactoe.json');

module.exports = Backbone.Model.extend({

  defaults: {
    state: 'NEW',
    players: [],
    board: [],
    winner: null,
    next: null
  },

  initialize: function() {
    this.initializeBoard();
  },

  addPlayer: function(player) {
    var players = this.get('players');
    var state = this.get('state');

    if (state !== 'NEW' || players.length === 2) {
      return;
    }

    if (!!_.find(players, player)) {
      return;
    }

    // make it random
    player.stone = (players.length === 1) ? 'X' : 'O';
    players.push(player);

    if (players.length === 2) {
      this.set({
        next: players[_.random(1)],
        state: 'RUNNING'
      });
    }
  },

  getChannel: function() {
    return '/game/' + this.get('id');
  },

  move: function(action) {
    var board = this.get('board');
    var next = this.get('next');
    var players = this.get('players');
    var state = this.get('state');
    var player = _.find(players, function(player) {
      return player.id === action.player.id;
    });

    if (state !== 'RUNNING') {
      return false;
    }

    if (!_.find(players, action.player)) {
      return false;
    }

    if (action.player.id !== next.id) {
      return false;
    }

    if (board[action.index] !== ' ') {
      return false;
    }

    board[action.index] = player.stone;

    this.update(action);

    return true;
  },

  update: function(action) {
    if (this.isWinningMove(action.index)) {
      return this.set({
        winner: action.player,
        state: 'ENDED'
      });
    }
    if (this.noMoreMoves()) {
      return this.set('status', 'ENDED');
    }

    var next = _.find(this.get('players'), function(player) {
      return player.id !== action.player.id;
    });

    this.set('next', next);
  },

  isWinningMove: function(index) {
    var type = this.get('type');
    var board = this.get('board');
    var stone = board[index];
    var winningTable = boardConfig[type].winningTable;
    for (var i = 0; i < winningTable[index].length; i++) {
      var line = winningTable[index][i];
      if (stone === board[line[0]] && stone === board[line[1]]) {
        return true;
      }
    }
    return false;
  },

  noMoreMoves: function() {
    return !!_.find(this.get('board'), ' ');
  },

  initializeBoard: function() {
    var type = this.get('type');
    var board = [];
    var i;

    for (i = 0; i < boardConfig[type].size; i++) {
      board.push(' ');
    }

    this.set('board', board);
  }
});
