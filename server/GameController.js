"use strict";

var GameEngine = require('./GameEngine');
var GamesCollection = require('./entities/GameCollection');

function startEngine(socket) {
  var store = new GamesCollection([]);
  var engine = new GameEngine(socket, store);

  socket.on('game:create', function(cb) {
    cb('vienas');
  });
//  engine.store.on('change:state add remove', engine.broadcastGameList.bind(engine));
//  socket.on('game:list', engine.sendGameList.bind(engine));
//  socket.on('game:details', engine.sendGameDetails.bind(engine));
//  socket.on('game:join', engine.joinGame.bind(engine));
//  socket.on('game:move', engine.makeMove.bind(engine));
  
  socket.on('PING', function(cb) {
    cb('PONG');
  });
}

module.exports = function(io) {
  io.on('connection', startEngine);
};
