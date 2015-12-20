
app.factory('errorService', [function() {
  function getErrorMessage(id) {
    var errors = {
      'DEFAULT': 'Unknown Error',
      'game-not-found': 'Game does not exist',
      'game-join-failed': 'Unable to join the game'
    };

    return (errors[id]) ? errors[id] : errors.DEFAULT;
  }

  return {
    getErrorMessage: getErrorMessage
  };
}]);

app.factory('gameService', ['$q', function(Q) {
  this.listeners = {};

  function setPlayer(player) {
    if (!player.name) {
      player.name = 'Anonymous Coward';
    }
    this.player = player;
  }

  function getPlayer() {
    return this.player;
  }

  function getGame(id) {
    return Q(function(resolve, reject) {
      resolve({
        size: 5
      });
    });
  }

  function createOrJoin() {
    return Q(function(resolve, reject) {
      resolve('asd');
    });
  }

  function createGame() {
    return Q(function(resolve, reject) {
      reject();
    });
  }

  function findGame() {
    return Q(function(resolve, reject) {
      reject();
    });
  }

  function joinGame(id) {
    return Q(function(resolve, reject) {
      reject();
    });
  }

  function createBoard(size) {
    var row, col, board = [];
    for (row = 0; row < size; row++) {
      if (!board[row]) {
        board[row] = [];
      }
      for (col = 0; col < size; col++) {
        board[row][col] = {
          value: null,
          x: col,
          y: row
        };
      }
    }
    return board;
  }

  function on(event, callback, context) {
    this.listeners[event] = {
      callback: callback,
      context: context || this
    };
  }

  return {
    on: on,
    createBoard: createBoard,
    setPlayer: setPlayer,
    getPlayer: getPlayer,
    createOrJoin: createOrJoin,
    createGame: createGame,
    findGame: findGame,
    joinGame: joinGame,
    getGame: getGame
  };
}]);

