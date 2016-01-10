/// <reference path="../typings/tsd.d.ts" />

import * as _ from 'lodash';

export class Player {
  id: number;
  name: string;

  constructor(id: number, name = "Anonymous Coward") {}
}

export class PlayerList {
  players: Array<Player>;

  findOrCreate(user: Player) {
    var player = this.findById(user.id);

    if (!player) {
      player = new Player(user.id, user.name);
    }

    this.players.push(player);

    return player;
  }

  findById(playerId: number): Player {
    return _.find(this.players, (player) => {
      return player.id === playerId;
    });
  }
}

