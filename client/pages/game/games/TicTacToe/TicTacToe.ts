import {Component} from 'angular2/core';
import {SiteHeader} from 'shared/directives';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: 'pages/game/games/TicTacToe/TicTacToe.html',
  directives: [SiteHeader]
})
export class TicTacToe {
  constructor() {
    console.log('tictactoe board');
  }
}
