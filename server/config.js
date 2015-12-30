'use strict';

var MemoryStore = require('./store/MemoryStore');
var TicTacToe = require('./engine/TicTacToe');

module.exports = {
  getEngine: function() {
    return new TicTacToe();
  },

  getStore: function() {
    return new MemoryStore();
  }
};
