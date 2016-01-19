/// <reference path="../typings/tsd.d.ts" />

import {Player, PlayerList} from './player';
import {Game, GameType} from './game';
import {Action, Board} from './board';

export interface PlayGameParams {
  player: Player;
  game: {id?: number, type: GameType};
};

export interface LeaveGameParams {
  playerId: number;
  gameId: number;
};

export interface GameCallback {
  (game: Game): void;
}

export class GameServer {
  games: Array<Game>;

  constructor(public server: SocketIO.Server) {
    server.on('connect', this.onClientConnect.bind(this));
  }

  private pingAction(callback: any) {
    callback('pong');
  }

  private onClientConnect(socket: SocketIO.Socket): void {
    socket.on('ping', this.pingAction.bind(this));
    this.broadcastGameList();
  }

  private broadcastGameList(): void {
    this.server.emit('gameList', this.games);
  }
}
