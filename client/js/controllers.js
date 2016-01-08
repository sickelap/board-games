app.controller('LobbyController', ['$state', 'connection', function($state, socket) {
  var self = this;
  var playerId = parseInt($state.params.playerId, 10);

  this.playGame = function(game) {
    socket.emit('play', {
      playerId: playerId
    }, function(game) {
      if (game._id) {
        $state.go('game', {
          playerId: playerId,
          gameId: game._id
        });
      }
    });
  };

  this.joinGame = function(game) {
    socket.emit('play', {
      _id: game._id,
      playerId: playerId
    }, function(game) {
      if (game._id) {
        $state.go('game', {
          playerId: playerId,
          gameId: game._id
        });
      }
    });
  };

  socket.on('list:updated', function(games) {
    self.games = games;
  });
}]);

app.controller('GameController', ['$state', 'connection', function($state, socket) {
  var playerId = parseInt($state.params.playerId, 10);
  var gameId = $state.params.gameId;

  this.leave = function() {
    socket.emit('leave', {
      _id: gameId,
      playerId: playerId
    }, function() {
      $state.go('lobby', {
        playerId: playerId
      });
    });
  };

  this.ready = function() {
    socket.emit('ready', {
      _id: gameId,
      playerId: playerId
    }, function(response) {
      console.log(response);
    });
  };

  this.move = function() {
    socket.emit('move', {

    });
  };
}]);
