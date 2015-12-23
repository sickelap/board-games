"use strict";

var GameEngine = require('./GameEngine');
var GamesCollection = require('./entities/GameCollection');

function startEngine(socket) {
  var store = new GamesCollection([]);
  var engine = new GameEngine(socket, store);

  engine.store.on('change:state add remove', engine.broadcastGameList.apply(engine));
  socket.on('game:list', engine.sendGameList.apply(engine));
  socket.on('game:details', engine.sendGameDetails.apply(engine));
  socket.on('game:create', engine.createGame.apply(engine);
  socket.on('game:join', engine.joinGame.apply(engine));
  socket.on('game:move', engine.makeMove.apply(engine));
}

module.exports = function(io) {
  io.on('connection', startEngine);
}
