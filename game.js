function Game(io) {
  io.on('connection', onConnect);
}

function onConnect(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function(data) {
    console.log(data);
  });
};

module.exports = Game;
