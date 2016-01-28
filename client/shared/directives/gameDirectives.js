
app.directive('cell', function() {
  var linkFn = function(scope, el) {
    el.on('click', function() {
      console.log(scope.c);
    });
  };

  return {
    scope: '=',
    restrict: 'A',
    replace: true,
    template: '<td class="cell">{{content}}</td>',
    link: linkFn
  };
});

app.directive('row', function() {
  return {
    scope: {
      row: '='
    },
    restrict: 'A',
    replace: true,
    template: '<tr class="row">' +
      '<td class="cell" data-cell="c" ng-repeat="c in row track by $index"></td>' +
      '</tr>'
  };
});

app.directive('board', function() {
  return {
    scope: {
      board: '='
    },
    template: '<table class="board">' +
      '<tr class="row" data-row="r" ng-repeat="r in board track by $index"></tr>' +
      '</table>',
    replace: true
  };
});

