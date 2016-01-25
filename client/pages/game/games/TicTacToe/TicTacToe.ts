import {Component} from 'angular2/core';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: 'pages/game/games/TicTacToe/TicTacToe.html'
})
export class TicTacToe {
  constructor() {
    console.log('tictactoe board');
  }
}
