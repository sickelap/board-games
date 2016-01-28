var app = angular.module('app', ['ui.router', 'btford.socket-io']);

app.config(['$urlRouterProvider', function(routerProvider) {
  routerProvider.otherwise('/');
}]);
