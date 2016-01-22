/// <reference path="../typings/tsd.d.ts" />

export class GameController {
  constructor(public server: SocketIO.Server) {
    server.on('connect', this.onClientConnect.bind(this));
  }

  private onClientConnect(socket: SocketIO.Socket): void {
    socket.on('getGames', () => this._getGames(socket));
  }

  _getGames(socket: SocketIO.Socket) {
    socket.emit('gameList', ['this','is','game','list']);
  }
}
