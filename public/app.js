angular.module('game', [])

.controller('boardController', function() {
  this.cells = [];
})

.directive('board', function() {
  return {
    templateUrl: 'board.html',
    scope: {num: '=board'},
    restrict: 'A',
    replace: true,
    link: function(scope, element) {
      console.log(element, element[0].clientWidth);

      createBoard(scope);

      function createBoard(scope) {
        var x = 0;
        var y = 0;
        var cellSize = 100;
        var num = scope.num;
        
        scope.width = num * cellSize + num + 1;
        scope.height = num * cellSize + num + 1;

        scope.cells = [];
        while (scope.cells.length < num * num) {
          var cx = (scope.cells.length % num) ? x + 1 : 0;
          var cy = (scope.cells.length % num) ? y : y + 1;
          scope.cells.push({
            x: cx * cellSize + 1,
            y: cy * cellSize + 1,
            width: cellSize,
            height: cellSize,
            value: null
          });
        }
      }
    }
  };
});
