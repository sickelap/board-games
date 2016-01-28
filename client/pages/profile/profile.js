
app.config(['$stateProvider', function(stateProvider) {
  stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'pages/profile/profile.tpl.html',
    controller: 'ProfileController',
    controllerAs: 'profile'
  });
}]);

app.controller('ProfileController', ['$state', 'userService', function($state, user) {
  this.name = user.getPlayer().name;

  this.submit = function() {
    user.setName(this.name);
    $state.go('lobby');
  };
}]);

