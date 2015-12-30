'use strict';

process.env.APP_PORT = 3001;
process.env.NODE_ENV = 'test';

var io = require('socket.io-client');
var server = require('../../server/app');

function createClient() {
  var url = 'http://localhost:3001';
  var options = {
    transports: ['websocket'],
    'force new connection': true
  };

  return io.connect(url, options);
}

describe('game server', function() {
  beforeAll(function() {
    server.start();
  });
  afterAll(function() {
    server.stop();
  });

  it('should respond to PING with PONG', function(done) {
    var client = createClient();

    client.on('connect', function() {
      client.emit('PING', function(response) {
        expect(response).toBe('PONG');
        done();
      });
    });
  });

  it('should create game when message "game:create" is sent', function(done) {
    var client = createClient();

    client.on('connect', function() {
      client.emit('game:create', function(response) {
        expect(response).toEqual([]);
        done();
      });
    });
  });
});
