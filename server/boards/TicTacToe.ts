/// <reference path="../../typings/tsd.d.ts" />
//
import * as _ from 'lodash';
import {Player} from '../player';
import {BoardState, Result, ResultSuccess, ResultError, Board, Action, BoardJSON} from '../board';

const NUM_PLAYERS = 2;

export class TicTacToe implements Board {
  private _content: Array<string> = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  private _players: Array<Player> = [];
  private _winner: Player = null;
  private _ready: Array<Player> = [];
  private _state: string = BoardState.NEW;
  private _stones = ['X', 'O'];
  private _nextMove: Player = null;

  configure(): Result {
    if (this._state !== BoardState.NEW) {
      return new ResultError('Cannot configure');
    }

    return new ResultSuccess({
      board: this._content
    });
  }

  join(player: Player): Result {
    if (this._players.length === NUM_PLAYERS) {
      return new ResultError('Too many players');
    }

    this._players.push(player);

    return new ResultSuccess();
  }

  ready(player: Player): Result {
    if (this._players.indexOf(player) === -1) {
      return new ResultError('Not a player');
    }

    if (_.find(this._ready, player)) {
      return new ResultError('Already ready');
    }

    this._ready.push(player);

    if (this._ready.length === NUM_PLAYERS) {
      if (this._nextMove === null) {
        this._nextMove = this._getPlayerForNextMove();
      }
      this._state = BoardState.RUNNING;
    }

    return new ResultSuccess();
  }

  move(action: Action): Result {
    var result = this._validateAction(action);
    if (result.status !== 'ok') {
      return result;
    }

    this._updateContent(action);

    if (this._isWinningMove(action)) {
      this._state = BoardState.ENDED;
      this._winner = action.player;
      return new ResultSuccess({
        board: this._content,
        winner: this._winner
      });
    }

    if (this._availablePositions().length === 0) {
      this._state = BoardState.ENDED;
    }

    this._nextMove = this._getPlayerForNextMove();

    return new ResultSuccess({
      board: this._content,
      winner: this._winner
    });
  }

  serialize(): BoardJSON {
    return {
      state: this._state,
      content: this._content,
      players: this._players,
      ready: this._ready,
      winner: this._winner,
      nextMove: this._nextMove
    };
  }

  _getPlayerForNextMove(): Player {
    if (this._nextMove === null) {
      return _.sample(this._players);
    }

    return _.first(_.without(this._players, this._nextMove));
  }

  _validateAction(action: Action): Result {
    if (this._state === 'ENDED') {
      return new ResultError('Game ended');
    }

    if (this._state !== 'RUNNING') {
      return new ResultError('Game is not started yet');
    }

    if (this._nextMove != action.player) {
      return new ResultError('Not your turn');
    }

    var availablePositions = this._availablePositions();
    var movePosition = this._getBoardPosition(action);

    if (!_.includes(availablePositions, movePosition)) {
      return new ResultError('Invalid move');
    }

    return new ResultSuccess();
  }

  _getStoneForPlayer(player: Player): string {
    return this._stones[this._players.indexOf(player)];
  }

  _updateContent(action: Action): void {
    var stone = this._getStoneForPlayer(action.player);
    var index = this._getBoardPosition(action);

    this._content[index] = stone;
  }

  _getBoardPosition(action: Action): number {
    return action.to.x + 3 * action.to.y;
  }

  _availablePositions(): Array<number> {
    var positions = _.map(this._content, (value, index) => {
    if (value === ' ') {
      return index;
    }
    });
    return _.filter(positions, (value) => {
      return value >= 0; // filter out undefined values
    });
  }

  /**
   * http://stackoverflow.com/a/24376236/2352294
   */
  _isWinningMove(action: Action) {
    var winLines = [
    [[1, 2], [4, 8], [3, 6]],
    [[0, 2], [4, 7]],
    [[0, 1], [4, 6], [5, 8]],
    [[4, 5], [0, 6]],
    [[3, 5], [0, 8], [2, 6], [1, 7]],
    [[3, 4], [2, 8]],
    [[7, 8], [2, 4], [0, 3]],
    [[6, 8], [1, 4]],
    [[6, 7], [0, 4], [2, 5]]
    ];

    var index = this._getBoardPosition(action);
    var stone = this._content[index];
    for (var i = 0; i < winLines[index].length; i++) {
      var line = winLines[index][i];
      if (stone === this._content[line[0]] && stone === this._content[line[1]]) {
        return true;
      }
    }
    return false;
  }
}
