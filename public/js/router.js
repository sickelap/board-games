app.config(['$urlRouterProvider', '$stateProvider', function(routerProvider, stateProvider) {

  stateProvider.state('home', {
    url: '/',
    templateUrl: '/templates/home.tpl.html',
    controller: 'HomeController as home'
  });

  stateProvider.state('lobby', {
    url: '/lobby',
    templateUrl: '/templates/lobby.tpl.html',
    controller: 'LobbyController as lobby'
  });

  stateProvider.state('game', {
    url: '/game/:id',
    templateUrl: '/templates/game.tpl.html',
    controller: 'GameController as game'
  });

  stateProvider.state('error', {
    url: '/error/:id',
    templateUrl: '/templates/error.tpl.html',
    controller: 'ErrorController as error',
    resolve: {
      message: ['$stateParams', 'errorService', function(params, errorService) {
        return errorService.getErrorMessage(params.id);
      }]
    }
  });

  routerProvider.otherwise('/');
}]);
