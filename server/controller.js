'use strict';

var GameList = require('./entities/GameList');
var GameModel = require('./entities/GameModel');

function Controller() {
  this.games = new GameList([]);
}
Controller.fn = Controller.prototype;

Controller.fn.handle = function(server) {
  var self = this;

  server.on('connect', function(socket) {
    console.log('client connected');
    var context = {
      games: self.games,
      server: server,
      socket: socket
    };
    socket.on('join:request', joinGame.bind(context));
    socket.on('play:request', playGame.bind(context));
    socket.on('move:request', makeMove.bind(context));
//    socket.on('game:request', getGame.bind(context));
    socket.on('list:request', listGames.bind(context));
    socket.on('leave:request', listGames.bind(context));
//    socket.emit('game:list', self.games);

    broadcastGameList = broadcastGameList.bind(context);
    notifyGame = notifyGame.bind(context);
  });
};

var broadcastGameList = function() {
  this.server.emit('game:list', this.games);
};

var notifyGame = function(game) {
  this.server.to(game.getChannel()).emit('game:update', game);
};

var leaveGame = function(params) {
  console.log('leaveGame', params);
  var game = this.games.get(params.id);
  if (!game) {
    return;
  }
  this.socket.leave(game.getChannel());
  this.socket.emit('leave:response');
};

var joinGame = function(params) {
  console.log('joinGame', params);
  var game = this.games.get(params.gameId);
  if (!game) {
    return this.socket.emit('join:response', {
      error: 'game not found'
    });
  }
  game.addPlayer(params.player);
  this.socket.join(game.getChannel()).emit('join:response', game);
  notifyGame(game);
  broadcastGameList();
};

var playGame = function(params) {
  console.log('playGame', params);
  var game = this.games.createGame(params);
  this.socket.emit('play:response', game);
};

var makeMove = function(params) {
  var game = this.games.get(params.gameId);
  if (!game) {
    console.log('MakeMove: GAME NOT FOUND');
    return;
  }
  var result = game.move(params);
  notifyGame(game);
};

var getGame = function(id) {
  this.socket.emit('game:response', this.games.get(id));
};

var listGames = function() {
  this.socket.emit('list:response', this.games);
};


var emitError = function(message) {
  this.socket.emit('error', {
    message: message
  });
};

module.exports = new Controller();
