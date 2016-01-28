app.directive('boardTicTacToe', ['$sce', 'userService', 'socketService', function($sce, user, socket) {

  function linkFn(scope, el) {
    scope.player = user.getPlayer();

    scope.onClick = function(index) {
      if (scope.game.next.id !== scope.player.id) {
        return;
      }
      var data = {
        gameId: scope.game.id,
        player: scope.player,
        index: index
      };
      socket.emit('move:request', data);
    };
  }

  return {
    scope: {
      game: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'shared/directives/board.tpl.html',
    link: linkFn
  };
}]);
