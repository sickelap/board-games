/// <reference path="../typings/tsd.d.ts" />

import * as _ from 'lodash';
import {Player} from './player';
import {TicTacToe} from './boards/TicTacToe';

export interface Action {
  // actor
  playerId: number;

  // item
  stone: string;

  // move positions
  x: number;
  y: number;
}

export enum GameState {
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
  players: Array<Player>;
  isValidAction(a: Action): boolean;
  makeMove(a: Action): void;
  getContent(): any;
  hasWinner(): boolean;
  getWinner(): any;
}

export class Game {
  gameType: GameType;
  state: GameState;
  board: Board;

  constructor(gameType: GameType) {
    this.gameType = gameType;
    this.board = this.createBoard(gameType);
  }

  hasWinner(): boolean {
    return false;
  }

  getWiner(): Player {
    return null;
  }

  getBoard(): Board {
    return this.board;
  }

  addPlayer(player: Player): void {

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

