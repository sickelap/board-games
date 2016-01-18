import {Player} from '../player';
import {Board, BoardState, Action} from '../game';

const NUM_PLAYERS = 2;

export var ResultStatus = {
  OK: 'ok',
  ERROR: 'error'
};

interface Result {
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

export class TicTacToe implements Board {
  _content: Array<string> = ['','','','','','','','',''];
  _players: Array<Player> = [];
  _ready: Array<Player> = [];
  _state: BoardState = BoardState.NEW;

  get content(): Array<string> {
    return this._content;
  }

  get players(): Array<Player> {
    return this._players;  
  }

  setPlayerReady(player: Player) {
    if (this._players.indexOf(player) === -1) {
      return;
    }

    if (this._ready.indexOf(player) === -1) {
      this._ready.push(player);
    }
  }

  start() {
    if (this._state !== BoardState.NEW) {
      return new ResultError('Unable start (state = ' + this._state + ')');
    }

    if (this.players.length !== NUM_PLAYERS) {
      return new ResultError('Not all players joined');
    }

    this._state = BoardState.RUNNING;

    return new ResultSuccess();
  }

  addPlayer(player: Player): Result {
    if (this.players.length ===  NUM_PLAYERS) {
      return new ResultError('Too many players');
    }

    this.players.push(player);

    return new ResultSuccess();
  }
}
