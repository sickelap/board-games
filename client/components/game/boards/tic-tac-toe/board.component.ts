import {Component} from 'angular2/core';

@Component({
  selector: 'board',
  templateUrl: 'components/game/boards/tic-tac-toe/board.component.html'
})
export class TicTacToe {
  constructor() {
    console.log('tictactoe board');
  }
}
