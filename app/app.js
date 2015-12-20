(function() {
  'use strict';

  var app = angular.module('app', []);

  app.controller('appController', function() {

  });

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
    var linkFn= function(scope, el) {

    };

    return {
      scope: {
        row: '='
      },
      restrict: 'A',
      replace: true,
      template: '<tr class="row">' +
                '<td class="cell" data-cell="c" ng-repeat="c in row track by $index"></td>' +
                '</tr>',
      link: linkFn
    };
  });

  app.directive('board', function() {
    var linkFn = function(scope, el) {
      var row, col;

      scope.brd = [];

      for (row = 0; row < scope.size; row++) {
        if (!scope.brd[row]) {
          scope.brd[row] = [];
        }
        for (col = 0; col < scope.size; col++) {
          scope.brd[row][col] = {
            value: null,
            x: col,
            y: row
          };
        }
      }
    };

    return {
      scope: {
        size: '=board'
      },
      template: '<table class="board">' +
                '<tr class="row" data-row="r" ng-repeat="r in brd track by $index"></tr>' +
                '</table>',
      replace: true,
      link: linkFn
    };
  });

})();
