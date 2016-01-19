/// <reference path="../typings/tsd.d.ts" />

export class GameController {
  constructor(public server: SocketIO.Server) {
    server.on('connect', this.onClientConnect.bind(this));
  }

  private onClientConnect(socket: SocketIO.Socket): void {
    this.broadcastGameList();
  }

  private broadcastGameList(): void {
    this.server.emit('games', []);
  }
}
