app.config(['$urlRouterProvider', '$stateProvider', function(routerProvider, stateProvider) {

//  stateProvider.state('home', {
//    url: '/',
//    templateUrl: '/templates/home.tpl.html',
//    controller: 'HomeController as home'
//  });

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

  routerProvider.otherwise('/lobby');
}]);
