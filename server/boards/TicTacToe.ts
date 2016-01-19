import * as _ from 'lodash';
import {Player} from '../player';
import {BoardState, Result, ResultSuccess, ResultError, Board, Action} from '../board';

const NUM_PLAYERS = 2;

export class TicTacToe implements Board {
  private _content: Array<string> = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  private _players: Array<Player> = [];
  private _winner: Player = null;
  private _readyPlayers: Array<Player> = [];
  private _state: string = BoardState.NEW;
  private _stones = ['X', 'O'];

  get content(): Array<string> {
    return this._content;
  }

  get state(): string {
    return this._state;
  }

  get players(): Array<Player> {
    return this._players;  
  }

  get readyPlayers(): Array<Player> {
    return this._readyPlayers;
  }

  get winner(): Player {
    return this._winner;
  }

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

  setReady(player: Player): Result {
    if (this._players.indexOf(player) === -1) {
      return new ResultError('Not a player');
    }

    if (_.find(this._readyPlayers, player)) {
      return new ResultError('Already ready');
    }

    this._readyPlayers.push(player);

    if (this._readyPlayers.length === NUM_PLAYERS) {
      this._state = BoardState.RUNNING;
    }

    return new ResultSuccess();
  }

  move(action: Action): Result {
    if (this._state === 'ENDED') {
      return new ResultError('Game is ended');
    }

    if (this._state !== 'RUNNING') {
      return new ResultError('Game is not started yet');
    }

    if (!this._isValidAction(action)) {
      return new ResultError('Invalid action');
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

    return new ResultSuccess({
      board: this._content,
      winner: this._winner
    });
  }

  _isValidAction(action: Action): boolean {
    var availablePositions = this._availablePositions();
    var movePosition = this._getBoardPosition(action);

    return _.includes(availablePositions, movePosition);
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
