app.directive('gameHeader', ['userService', function(user) {
  function linkFn(scope) {
    scope.currentUser = user.getPlayer();
  }

  return {
    scope: {
      game: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'shared/directives/gameHeader.tpl.html',
    link: linkFn
  };
}]);
