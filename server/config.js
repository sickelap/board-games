'use strict';

module.exports = {
  getEngine: function() {
    return new require('./engine/TicTacToe');
  },

  getStore: function() {
    if (process.env.NODE_ENV === 'production') {
      return new require('./store/MongoStore');
    }

    return new require('./store/MemoryStore');
  }
};
