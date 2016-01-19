import {Player} from './player';

export var ResultStatus = {
  OK: 'ok',
  ERROR: 'error'
};

export var BoardState = {
  NEW: 'NEW',
  RUNNING: 'RUNNING',
  ENDED: 'ENDED'
}

export interface Action {
  player: Player;
  to: {
    x: number,
    y: number
  }
}

export interface Result {
  status: string,
  description?: string,
  data?: any
}

export class ResultSuccess implements Result {
  public status: string = ResultStatus.OK;
  public description: string;
  constructor(public data?: any) {}
}

export class ResultError implements Result {
  public status: string = ResultStatus.ERROR;
  constructor(public description: string = 'Unspecified error') {}
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

