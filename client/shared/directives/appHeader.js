app.directive('appHeader', ['userService', function(user) {
  var linkFn = function(scope) {
    scope.player = user.getPlayer();
  };

  return {
    restrict: 'E',
    templateUrl: 'shared/directives/appHeader.tpl.html',
    link: linkFn
  };
}]);
