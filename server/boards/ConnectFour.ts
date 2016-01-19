import {Player} from '../player';
import {Result, ResultSuccess, Board, Action, BoardJSON} from '../board';

const NUM_PLAYERS = 2;

export class ConnectFour implements Board {
  configure(config: any): Result {
    return new ResultSuccess();
  }

  join(player: Player): Result {
    return new ResultSuccess();
  }

  ready(player: Player): Result {
    return new ResultSuccess();
  }

  move(action: Action): Result {
    return new ResultSuccess();
  }

  serialize(): BoardJSON {
    return null;
  }
}
