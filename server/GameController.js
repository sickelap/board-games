"use strict";

var GameEngine = require('./GameEngine');
var GamesCollection = require('./entities/GameCollection');

function startEngine(socket) {
  var store = new GamesCollection([]);
  var engine = new GameEngine(socket, store);

//  engine.store.on('change:state add remove', engine.broadcastGameList.bind(engine));
//  socket.on('game:list', engine.sendGameList.bind(engine));
//  socket.on('game:details', engine.sendGameDetails.bind(engine));
//  socket.on('game:create', engine.createGame.bind(engine));
//  socket.on('game:join', engine.joinGame.bind(engine));
//  socket.on('game:move', engine.makeMove.bind(engine));
  
  socket.on('test:request', function() {
    socket.emit('test:reply', 'check');
  });
}

module.exports = function(io) {
  io.on('connection', startEngine);
};
