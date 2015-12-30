app.config(['$urlRouterProvider', '$stateProvider', function(routerProvider, stateProvider) {

  stateProvider.state('lobby', {
    url: '/lobby',
    templateUrl: '/templates/lobby.tpl.html',
    controller: 'LobbyController as lobby'
  });

  routerProvider.otherwise('/lobby');
}]);
