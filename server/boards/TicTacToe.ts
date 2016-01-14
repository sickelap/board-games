import {Player} from '../player';
import {Board, Action} from '../game';

const PLAYERS = 2;

export class TicTacToe implements Board {
  _content: Array<string>;
  players: Array<Player>;
  winner: Player;
  isConfigured: boolean = false;

  constructor() {
    this._content = ['','','','','','','','',''];
    this.winner = null;
  }

  configure(): void {
  }

  getContent(): Array<string> {
    return this._content;
  }

  makeMove(action: Action): void {

  }

  getWinner(): Player {
    return null;
  }

  allPlayersJoined(): boolean {
    return this.players.length === PLAYERS;
  }

  addPlayer(player: Player): void {
    this.players.push(player);    
  }

  removePlayer(player: Player): void {
    var index = this.players.indexOf(player);
    this.players.splice(index, 1);
  }
}
