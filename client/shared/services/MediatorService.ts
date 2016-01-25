import {Injectable} from 'angular2/core';

@Injectable()
export class Mediator {
  private _subscriptions: Array<any> = [];

  publish(channel: string, data: any) {
    if (!this._subscriptions[channel]) {
      return;
    }

    var subscribers = this._subscriptions[channel].slice();
    subscribers.forEach((subscriber: any) => subscriber.callback(data));
  }

  subscribe(channel: string, cb: () => void, id: number | string) {
    if (!this._subscriptions[channel]) {
      this._subscriptions[channel] = [];
    }

    return this._subscriptions[channel].push({
      callback: cb,
      id: id
    });
  };

  unsubscribe(channel: string, id: number | string) {
    if (!this._subscriptions[channel]) {
      return false;
    }
    for (var i = 0, len = this._subscriptions[channel].length; i < len; i++) { 
      if (this._subscriptions[channel][i].id === id) { 
        var removed = this._subscriptions[channel].splice(i, 1); 
        return (removed.length > 0);
      }
    }

    return false;
  };
}
