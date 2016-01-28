app.directive('gameContainer', [function() {
  function linkFn(scope) {
  }

  return {
    restrict: 'E',
    scope: {
      game: '=ngModel'
    },
    templateUrl: 'shared/directives/gameContainer.tpl.html',
    transclude: true,
    link: linkFn
  };
}]);
