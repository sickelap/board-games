app.config(['$stateProvider', function(stateProvider) {
  stateProvider.state('lobby', {
    url: '/',
    templateUrl: 'pages/lobby/lobby.tpl.html',
    controller: 'LobbyController',
    controllerAs: 'lobby',
    resolve: {
      games: ['$q', 'socketService', function(q, socket) {
        return q(function(resolve) {
          socket.emit('list:request');
          socket.on('list:response', function(list) {
            resolve(list);
          });
        });
      }]
    }
  });
}]);

app.controller('LobbyController', ['$state', 'socketService', 'games', 'userService', function(state, socket, games, user) {
  var self = this;
  this.games = games;

  this.play = function(type) {
    var data = {
      player: user.getPlayer(),
      type: type
    };
    socket.emit('play:request', data);
    socket.on('play:response', function(game) {
      state.go('game', game);
    });
  };

  socket.on('game:list', function(games) {
    self.games = games;
  });
}]);
