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

export interface BoardJSON {
  state: string,
  content: any,
  players: Array<Player>,
  ready: Array<Player>,
  winner: Player,
  nextMove: Player
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
  configure(config: any): Result,
  join(player: Player): Result;
  ready(player: Player): Result;
  move(action: Action): Result;
  serialize(): BoardJSON;
}

