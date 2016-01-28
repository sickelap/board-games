app.config(['$stateProvider', function(stateProvider) {
  stateProvider.state('game', {
    url: '/game/:id',
    templateUrl: 'pages/game/game.tpl.html',
    controller: 'GameController',
    controllerAs: 'game',
    resolve: {
      player: ['userService', function(user) {
        return user.getPlayer();
      }],
      game: ['$q', '$state', '$stateParams', 'socketService', 'userService', function(q, state, params, socket, user) {
        return q(function(resolve) {
          socket.emit('join:request', {
            gameId: params.id,
            player: user.getPlayer()
          });
          socket.on('join:response', function(game) {
            if (game.error) {
              console.log(game.error);
              state.go('lobby');
            } else {
              resolve(game);
            }
          });
        });
      }]
    }
  });
}]);

app.controller('GameController', ['$state', 'socketService', 'player', 'game', function($state, socket, player, game) {
  var self = this;
  this.data = game;
  this.player = player;

  this.observing = function() {
    return !_.find(self.data.players, self.player);
  };

  this.leave = function() {
    socket.emit('leave:request', {id: game.id, player: player});
    socket.on('leave:response', function() {
      $state.go('lobby');
    });
  };

  socket.on('game:update', function(game) {
    self.data = game;
  });
}]);
