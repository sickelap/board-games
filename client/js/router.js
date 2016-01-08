app.config(['$urlRouterProvider', '$stateProvider', function(routerProvider, stateProvider) {

  stateProvider.state('lobbyDefault', {
    url: '/lobby',
    controller: ['$state', function($state) {
      $state.go('lobby', {playerId: 100});
    }]
  });

  stateProvider.state('lobby', {
    url: '/lobby/:playerId',
    templateUrl: '/templates/lobby.tpl.html',
    controller: 'LobbyController',
    controllerAs: 'lobby'
  });

  stateProvider.state('game', {
    url: '/game/:playerId-:gameId',
    templateUrl: '/templates/game.tpl.html',
    controller: 'GameController',
    controllerAs: 'game'
  });

  routerProvider.otherwise('/lobby');
}]);
