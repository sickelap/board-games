'use strict';

var _ = require('lodash');
var uuid = require('uuid');
var Backbone = require('backbone');
var GameModel = require('./GameModel');
var boardConfig = require('./tictactoe.json');

module.exports = Backbone.Collection.extend({
  model: GameModel,
  sync: _.noop,

  createGame(data) {
    var game = new GameModel({
      id: uuid.v4(),
      type: data.type,
      className: boardConfig[data.type].className
    });

    this.add(game);
    return game;
  }
});
