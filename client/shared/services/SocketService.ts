/// <reference path="../../typings/tsd.d.ts" />
import {Injectable} from 'angular2/core';

@Injectable()
export class SocketService {
  _socket: SocketIO.Server;

  constructor() {
    this._socket = io.connect();
  }

  emit(...args: any[]): void {
    this._socket.emit.apply(this._socket, args);
  }

  on(...args: any[]): void {
    this._socket.on.apply(this._socket, args);
  }
}

declare var io: {
  connect(url?: string, options?: Object): SocketIO.Server;
}
