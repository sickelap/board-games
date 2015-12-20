app.controller('GameController', ['$state', '$stateParams', 'gameService', function(state, params, game) {
  this.player = game.getPlayer();

  if (!this.player) {
    state.go('home');
  }

  this.game = game.getGame(params.id).then(function(gameConfig) {
    this.board = game.createBoard(gameConfig.size);
  }).catch(function(error) {
    state.go('error', {error: error});
  });
}]);

app.controller('ErrorController', ['$state', 'message', function(state, message) {
  this.message = message;

  this.onClick = function() {
    state.go('lobby');
  };
}]);

app.controller('LobbyController', ['$state', 'gameService', function(state, game) {
  this.player = game.getPlayer();
  this.gameSize = 3;

  if (!this.player) {
    state.go('home');
  }

  this.onPlayGame = function() {
    game.createOrJoin().then(function(id) {
      state.go('game', {id: id});
    });
  };

  this.onCreateGame = function() {
    var size = (this.gameSize > 10 || this.gameSize < 3) ? 3 : this.gameSize;

    game.createGame(size).then(function(id) {
      state.go('game', {id: id});
    });
  };

  this.onJoinGame = function() {
    game.findGame(this.gameId).then(function(id) {
      state.go('game', {id: id});
    });
  };

  game.on('join', function(id) {
    state.go('game', {id: id});
  });

  game.on('error', function(error) {
    state.go('error', {error: error});
  });
}]);

app.controller('HomeController', ['$state', 'gameService', function(state, game) {
  this.player = {};

  this.onSubmit = function() {
    game.setPlayer(this.player);
    state.go('lobby');
  };
}]);

