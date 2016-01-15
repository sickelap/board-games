'use strict';

process.env.APP_PORT = 3001;
process.env.NODE_ENV = 'test';

var io = require('socket.io-client');

function createClient() {
  var url = 'http://localhost:3001';
  var options = {
    transports: ['websocket'],
    'force new connection': true
  };

  return io.connect(url, options);
}

xdescribe('game server', function() {
  var server;

  beforeAll(function() {
    server = require('../../server/app');
  });
  afterAll(function() {
    server.close();
  });

  it('should respond to PING with PONG', function(done) {
    var client = createClient();

    client.on('connect', function() {
      client.emit('ping', function(response) {
        expect(response).toBe('pong');
        done();
      });
    });
  });

  xit('should create game when message "create" is sent', function(done) {
    var client = createClient();

    client.on('connect', function() {
      var params = {
        public: true,
        playerId: 1
      };
      client.emit('create', params, function(response) {
        expect(response.players).toEqual([1]);
        expect(response.state).toBe('NEW');
        expect(response.public).toBe(true);
        done();
      });
    });
  });

  xit('should create new game when client send play game event', () => {
    var client = createClient();

    client.on('connect', function() {
      var playParams= {

      };
      var playCallback = function(response) {
        expect(response.board instanceof BoardInterface).toBeTrue();
      };

      client.emit('play', playParams, playCallback);
    });
  });
});
