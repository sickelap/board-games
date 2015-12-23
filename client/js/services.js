app.factory('connection', ['socketFactory', function(socketFactory) {
  return socketFactory();
}]);

app.factory('gameService', ['$q', '$location', 'connection', function(Q, $location, conn) {
  var listeners = {};
  var query = $location.search();
  var playerId = (query.playerId) ? query.playerId : null;
  
  if (!playerId) {
    throw new Error('add ?playerId=<number> url parameter');
  }

  function getPlayerId() {
    return playerId;
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

  function on(event, cb) {
    conn.addListener(event, cb);
  }

  function off(event, cb) {
    if (typeof cb === 'function') {
      conn.removeListener(event, cb);
    } else {
      conn.removeAllListeners(event);
    }
  }

  function trigger(event, data) {
    conn.emit(event, data);
  }

  function request(event, data) {
    return Q(function(resolve) {
      conn.addListener(event, function(data) {
        resolve(data);
        conn.removeAllListeners(event);
      });
      conn.emit(event, data);
    });
  }

  return {
    on: on,
    off: off,
    trigger: trigger,
    request: request,
    getPlayerId: getPlayerId,
    createBoard: createBoard
  };
}]);

