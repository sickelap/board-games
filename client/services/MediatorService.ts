import {Injectable} from 'angular2/core';

@Injectable()
export class Mediator {
  private _subscriptions: Array<any> = [];

  publish(channel, data) {
    if (!this._subscriptions[channel]) {
      return;
    }

    var subscribers = this._subscriptions[channel].slice();
    subscribers.forEach(subscriber => subscriber.callback(data));
  }

  subscribe(channel, cb, id) {
    if (!this._subscriptions[channel]) {
      this._subscriptions[channel] = [];
    }

    return this._subscriptions[channel].push({
      callback: cb,
      id: id
    });
  };

  unsubscribe(channel, id) {
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
