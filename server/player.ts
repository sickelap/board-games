import * as _ from 'lodash';

export class Player {
  name: string;

  constructor(name = "Anonymous Coward") {}
}

export class PlayerList {
  players: Array<Player>;

  findOrCreate(player: Player) {
    this.players.push(player);

    return player;
  }

  findById(playerId: number): Player {
    return _.find(this.players, (player) => {
      return player.id === playerId;
    });
  }
}

