'use strict';

var Backbone = require('backbone');
var GameModel = require('./GameModel');

module.exports = Backbone.Collection.extend({
  model: GameModel,

  createGame: function() {
    return this.add({})[0];
  }
});
