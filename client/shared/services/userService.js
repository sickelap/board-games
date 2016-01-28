app.factory('userService', [function() {

  function getPlayer() {
    return JSON.parse(localStorage.getItem('player'));
  }

  function storePlayer(player) {
    localStorage.setItem('player', JSON.stringify(player));
  }

  function setName(name) {
    if (!name) {
      name = 'Anonymous Coward';
    }
    var player = getPlayer();
    player.name = name;
    storePlayer(player);
  }

  if (!localStorage.getItem('player')) {
    var player = {
      id: UUID.generate(),
      name: 'Anonymous Coward'
    };
    storePlayer(player);
  }

  return {
    getPlayer: getPlayer,
    setName: setName
  };
}]);
