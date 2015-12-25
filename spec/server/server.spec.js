/* global describe, beforeEach, afterEach, it, expect */
'use strict';

var io = require('socket.io-client');

var socketUrl = 'http://localhost:3001';
var socketOptions = {
  transports: ['websocket'],
  'force new connection': true
};

describe('game server', function() {
  beforeEach(function() {
    process.env.PORT = 3001;
    this.app = require('../../server/app');
  });
  afterEach(function() {
    this.app.close();
  });

  it('should respond to PING with PONG', function(done) {
    var client = io.connect(socketUrl, socketOptions);
    client.on('connect', function() {
      client.on('test:reply', function(response) {
        expect(response).toBe('check');
        done();
      });
      client.emit('test:request');
    });
  });

  it('pending spec');
});
