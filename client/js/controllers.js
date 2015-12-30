app.controller('LobbyController', ['connection', '$location', function(connection, $location) {
  var self = this;
  var query = $location.search();
  var playerId = (query.playerId) ? parseInt(query.playerId, 10) : 100;

  this.createGame = function() {
    connection.emit('create', function(game) {
      console.log(game);
    });
  };

  this.listGames = function() {
    connection.emit('list', function(games) {
      self.games = games;
    });
  };

  this.joinGame = function(game) {
    connection.emit('join', {gameId: game._id, playerId: playerId}, function(game) {
      console.log(game);
    });
  };

  this.playGame = function(game) {
    connection.emit('play', {playerId: playerId}, function(game) {
      console.log(game);
    });
  };

  this.leaveGame = function(game) {
    connection.emit('leave', {gameId: game._id, playerId: playerId}, function(game) {
      console.log(game);
    });
  };

  this.listGames();

  connection.on('list:updated', function(games) {
    self.games = games;
  });
}]);

