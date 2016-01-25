/// <reference path="../../typings/tsd.d.ts" />
import {Injectable} from 'angular2/core';
import {SocketService} from './SocketService';

export class GameService {
  private _socket: SocketService;

  constructor() {
    this._socket = new SocketService();
  }

  // TODO: need to do something about Promise. Maybe try Observable instead?
  getGames(): Promise {
    return new Promise(resolve => {
      this._socket.on('gameList', (...args: any[]) => {
        resolve(args);
      });
      this._socket.emit('getGames');
    });
  }
}
