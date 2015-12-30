'use strict';

var _ = require('lodash');
var Backbone = require('backbone');

var Model = Backbone.Model.extend({});

var Collection = Backbone.Collection.extend({
  model: Model,
  add: function(o) {
    o.id = this.length;
    return Backbone.Collection.prototype.add.apply(this, arguments);
  }
});

function Store() {
  this.games = new Backbone.Collection([]);
}

Store.fn = Store.prototype;

Store.fn.findAllGames = function() {
  var self = this;

  return new Promise(function(resolve) {
    resolve(self.collection.toJSON());
  });
};

Store.fn.findGameById = function(id) {
  var self = this;

  return new Promise(function(resolve, reject) {
    var game = self.collection.find(id);
    if (game) {
      resolve(game); // pass-thru
    } else {
      reject('game not found');
    }
  });
};

Store.fn.findGamesWithPlayerId = function(playerId) {
  return new Promise(function(resolve) {
    var games = this.collection.filter(function(game) {
      return game.getPlayers().indexOf(playerId) !== -1;
    });
    resolve(games);
  });
};

module.exports = Store;
