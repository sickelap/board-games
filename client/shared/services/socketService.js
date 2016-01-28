app.factory('socketService', ['socketFactory', function(socketFactory) {
  return socketFactory();
}]);
