import * as _ from 'lodash';
import {Player} from './player';
import {TicTacToe} from './boards/TicTacToe';

export interface Action {
  playerId: number;
  stone: string;
  x: number;
  y: number;
}

export enum BoardState {
  NEW = 0,
  RUNNING = 1,
  ENDED = 2
}

export enum GameType {
  TicTacToe = 0,
  BattleShip = 1,
  ConnectFour = 2
}

export interface Board {
//  players: Array<Player>;
//  isConfigured: boolean;
//
//  makeMove(a: Action): void;
//  getContent(): any;
//  getWinner(): Player;
//  addPlayer(p: Player): void;
//  allPlayersJoined(): boolean;
//  configure(): void;
}

export class Game {
  gameType: GameType;
  board: Board;

  constructor(gameType: GameType) {
    this.gameType = gameType;
    this.board = this.createBoard(gameType);
  }

  getWinner(): Player {
    return this.board.getWinner();
  }

  getBoard(): Board {
    return this.board;
  }

  addPlayer(player: Player): void {
    if (this.state !== GameState.NEW) {
      return;
    }

    this.board.addPlayer(player);

    if (this.board.allPlayersJoined()) {
      this.state = GameState.RUNNING;
    }
  }

  private createBoard(gameType: GameType): Board {
    return new TicTacToe();
  }
}

export class GameList {
  games: Array<Game>;

  public createGame(gameType: GameType): Game {
    var game = new Game(gameType);
    this.games.push(game);
    return game;
  }

  public findGameById(gameId: number): Game {
    return _.findWhere(this.games, {id: gameId});
  }

  public findGameByPlayer(player: Player): Game {
    return _.find(this.games, (game) => {
      return _.contains(game.board.players, player);
    });
  }
}

