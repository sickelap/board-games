app.controller('GameController', ['$state', '$stateParams', 'gameService', function(state, params, game) {
  var self = this;
}]);

app.controller('LobbyController', ['$state', 'gameService', function(state, game) {
  var self = this;
  var player = {playerId: game.getPlayerId()};

  this.createGame = function() {
    game.request('game:create', player).then(function(game) {
      console.log(game);
    });
  };

  this.joinGame = function(game) {

  };

  this.leaveGame = function(data) {
    game.request('game:leave', {game: data.id, player: player});
  };

  game.on('games:updated', function(games) {
    console.log(games);
    self.games = games;
  });

  game.request('game:list', player).then(function(games) {
    self.games = games;
  });
}]);

