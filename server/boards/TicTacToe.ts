import {Player} from '../player';
import {Board, Action} from '../game';

export class TicTacToe implements Board {
  _content: Array<string>;
  players: Array<Player>;

  getContent(): Array<string> {
    return this._content;
  }

  isValidAction(action: Action): boolean {
    return true;
  }

  makeMove(action: Action): void {

  }

  hasWinner(): boolean {
    return false;
  }

  getWinner(): string {
    return null;
  }
}
