import * as _ from 'lodash';
import {Player} from './player';
import {TicTacToe} from './boards/TicTacToe';
import {Board,Action} from './board';

export enum GameType {
  TicTacToe = 0,
  BattleShip = 1,
  ConnectFour = 2
}

export class Game {
  gameType: GameType;
  board: Board;

  constructor(gameType: GameType) {
    this.gameType = gameType;
    this.board = this.createBoard(gameType);
  }

  //  getWinner(): Player {
  //    return this.board.getWinner();
  //  }

  getBoard(): Board {
    return this.board;
  }

  //  addPlayer(player: Player): void {
  //    if (this.state !== GameState.NEW) {
  //      return;
  //    }
  //
  //    this.board.addPlayer(player);
  //
  //    if (this.board.allPlayersJoined()) {
  //      this.state = GameState.RUNNING;
  //    }
  //  }

  private createBoard(gameType: GameType): Board {
    return new TicTacToe();
  }
}

