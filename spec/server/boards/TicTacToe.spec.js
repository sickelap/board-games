'use strict';

var Board = require('../../../server/boards/TicTacToe');

describe('TicTacToe', () => {
  var board;

  beforeEach(() => {
    board = new Board.TicTacToe();
  });

  describe('new instance', () => {
    it('should have empty board', () => {
      var result = board.content;

      expect(result).toEqual(['', '', '', '', '', '', '', '', '']);
    });
  });

  describe('starting the game', () => {
    it('should not start game if not all players joined', () => {
      var result = board.start();

      expect(result.status).toBe(Board.ResultStatus.ERROR);
    });

    it('should not start game if not all players joined', () => {
      board.addPlayer({
        id: 1
      });

      var result = board.start();

      expect(result.status).toBe(Board.ResultStatus.ERROR);
    });

    it('should start game if all players joined', () => {
      board.addPlayer({
        id: 1
      });
      board.addPlayer({
        id: 2
      });

      var result = board.start();

      expect(result.status).toBe(Board.ResultStatus.OK);
    });
  });

  describe('adding new player', () => {
    it('should add a player if not all players joined', () => {
      var result = board.addPlayer({
        id: 1
      });
    });
  });

  // -- instance --
  //
  // fresh table should be empty
  // status should be NEW
  // players should be empty array
  // ready players shoud be empty array
  //
  // -- configuration --
  // configure should return success
  //
  // -- players -- 
  // add 1st and 2nd player should add player
  // after adding 1st and 2nd player player array should be correct
  // add 3rd player should not add player
  // setting playerReady should add player to ready array
  // setting playerReady for non existing player should not add player
  //
  // -- start game --
  // should not start game if not all players are joined
  // should not start game is not all players are ready
  // should not start game if game state is not NEW
  // otherwise should set game satus to RUNNING
  //
  // -- make move --
  // should not make a move if game status not RUNNING
  // should not make move if action is invalid
  // result should be success if action is valid
  // result should contain updated board if return is valid
  //
  // -- result --
  // should return error if game is not ENDED
  // should return success if game is ended and result should not contain winner if result is TIE
  // should return success if game is ended and result should contain winner
  //
  // -- validate move --
  // the move is valid if:
  // - game is not finished
  // - player is allowed to make turn
  // - cell player trying to enter is empty
  //

});
