'use strict';

var TicTacToe = require('../../../server/boards/TicTacToe').TicTacToe;
var Board = require('../../../server/board');

var player1 = {
  id: 1,
  name: 'Player1'
};
var player2 = {
  id: 2,
  name: 'Player2'
};
var player3 = {
  id: 3,
  name: 'Player3'
};

describe('TicTacToe', () => {
  var board, nextMovePlayer;

  beforeEach(() => {
    board = new TicTacToe();
    nextMovePlayer = spyOn(board, '_getPlayerForNextMove').and;
  });

  describe('new instance', () => {
    it('should have empty board', () => {
      expect(board.serialize().content).toEqual([
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ]);
    });

    it('should have state NEW', () => {
      expect(board.serialize().state).toBe(Board.BoardState.NEW);
    });

    it('should have empty players array', () => {
      expect(board.serialize().players).toEqual([]);
    });

    it('should have empty ready players array', () => {
      expect(board.serialize().ready).toEqual([]);
    });
  });

  describe('configuration', () => {
    it('should return success regardless of input', () => {
      var actual;

      actual = board.configure();
      expect(actual.status).toBe('ok');
      expect(actual.data).toEqual({
        board: [
          ' ', ' ', ' ',
          ' ', ' ', ' ',
          ' ', ' ', ' '
        ]
      });

      actual = board.configure({
        anything: 'anything'
      });
      expect(actual.status).toBe('ok');
      expect(actual.data).toEqual({
        board: [
          ' ', ' ', ' ',
          ' ', ' ', ' ',
          ' ', ' ', ' '
        ]
      });
    });

    it('should return error if game state is not NEW', () => {
      var actual;
      board._state = 'RUNNING';

      actual = board.configure();

      expect(actual.status).toBe('error');
      expect(actual.description).toBe('Cannot configure');
    });
  });

  describe('players', () => {
    it('should allow to join the table for 2 players only', () => {
      var actual;

      actual = board.join(player1);
      expect(actual).toEqual(new Board.ResultSuccess());
      expect(board.serialize().players.length).toBe(1);

      actual = board.join(player2);
      expect(actual).toEqual(new Board.ResultSuccess());
      expect(board.serialize().players.length).toBe(2);

      actual = board.join(player3);
      expect(board.serialize().players.length).toBe(2);
      expect(actual.status).toBe('error');
      expect(actual.description).toBe('Too many players');
    });

    it('should not update board state if only one player is ready', () => {
      board.join(player1);
      board.join(player2);

      board.ready(player1);

      expect(board.serialize().ready.length).toBe(1);
      expect(board.serialize().ready[0]).toEqual(player1);
      expect(board.serialize().state).toBe(Board.BoardState.NEW);
    });

    it('should update board state to RUNNING if two players are ready', () => {
      board.join(player1);
      board.join(player2);

      board.ready(player1);
      board.ready(player2);

      expect(board.serialize().state).toBe(Board.BoardState.RUNNING);
    });

    it('should allow to set player ready only once', () => {
      var result;
      board.join(player1);
      board.join(player2);

      result = board.ready(player1);
      expect(board.serialize().ready.length).toBe(1);
      expect(result.status).toBe('ok');

      result = board.ready(player1);
      expect(result.status).toBe('error');
      expect(result.description).toBe('Already ready');
    });

    it('should allow only player in players list to be set as ready', () => {
      var actual;
      board.join(player1);

      board.ready(player1);
      expect(board.serialize().ready.length).toBe(1);

      actual = board.ready(player2);
      expect(board.serialize().ready.length).toBe(1);
      expect(actual.status).toBe('error');
      expect(actual.description).toBe('Not a player');
    });

    it('should assign "X" stone for player who joined first', () => {
      var actual;
      board.join(player1);
      board.join(player2);

      board.ready(player1);
      board.ready(player2);

      expect(board._getStoneForPlayer(player1)).toBe('X');
    });

    it('should assign "O" stone for player who joined second', () => {
      var actual;
      board.join(player1);
      board.join(player2);

      board.ready(player1);
      board.ready(player2);

      expect(board._getStoneForPlayer(player2)).toBe('O');
    });
  });

  describe('make move', () => {
    it('should not allow to make move if game is not running', () => {
      var result;
      board._nextMove = player1;
      board.join(player1);
      board.join(player2);

      board.ready(player1);

      result = board.move({
        player: player1,
        to: {
          x: 0,
          y: 0
        }
      });

      expect(result.status).toBe('error');
      expect(result.description).toBe('Game is not started yet');
    });

    it('should allow to make a move if game is started', () => {
      var result;
      board._nextMove = player1;
      board.join(player1);
      board.join(player2);

      board.ready(player1);
      board.ready(player2);

      result = board.move({
        player: player1,
        to: {
          x: 0,
          y: 0
        }
      });

      expect(result.status).toBe('ok');
    });

    it('should allow to make a move if action is valid', () => {
      var result;
      board._nextMove = player1;
      board.join(player1);
      board.join(player2);
      board.ready(player1);
      board.ready(player2);

      // assuming blank board
      result = board.move({
        player: player1,
        to: {
          x: 0,
          y: 0
        }
      });

      expect(result.status).toBe('ok');
    });

    it('should not allow to make a move if action is invalid', () => {
      var result;
      board._nextMove = player1;
      board.join(player1);
      board.join(player2);
      board.ready(player1);
      board.ready(player2);
      board._content = [
        'O', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ];
      result = board.move({
        player: player1,
        to: {
          x: 0,
          y: 0
        }
      });

      expect(result.status).toBe('error');
      expect(result.description).toBe('Invalid move');
    });

    it('should return updated board after valid action', () => {
      var result;
      board._nextMove = player1;
      board.join(player1);
      board.join(player2);

      board.ready(player1);
      board.ready(player2);

      result = board.move({
        player: player1,
        to: {
          x: 1,
          y: 1
        }
      });

      expect(result.data.board).toEqual([
        ' ', ' ', ' ',
        ' ', 'X', ' ',
        ' ', ' ', ' '
      ]);
    });

    it('should change game state to finished if there is no moves left', () => {
      var result;
      board._nextMove = player1;
      board.join(player1);
      board.join(player2);
      board.ready(player1);
      board.ready(player2);
      board._content = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        ' ', 'X', 'O'
      ];

      result = board.move({
        player: player1,
        to: {
          x: 0,
          y: 2
        }
      });

      expect(result.data.board).toEqual([
        'X', 'O', 'X',
        'O', 'X', 'O',
        'X', 'X', 'O'
      ]);
      expect(board.serialize().state).toBe(Board.BoardState.ENDED);
    });

    it('should change game state to finished if player1 won the game', () => {
      var result;
      board._nextMove = player1;
      board.join(player1);
      board.join(player2);
      board.ready(player1);
      board.ready(player2);
      board._content = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        ' ', 'O', ' '
      ];

      result = board.move({
        player: player1,
        to: {
          x: 2,
          y: 2
        }
      });

      expect(result.data.board).toEqual([
        'X', 'O', 'X',
        'O', 'X', 'O',
        ' ', 'O', 'X'
      ]);
      expect(board.serialize().state).toBe(Board.BoardState.ENDED);
    });
  });

  /**
   * test translation of 2d array into 1d array
   */
  describe('action to board index translation', () => {
    it('should return correct board index value', () => {
      var action = {
        player: player1,
        to: {
          x: 0,
          y: 0
        }
      };

      action.to.x = 0;
      action.to.y = 0;
      expect(board._getBoardPosition(action)).toBe(0);

      action.to.x = 1;
      action.to.y = 0;
      expect(board._getBoardPosition(action)).toBe(1);

      action.to.x = 2;
      action.to.y = 0;
      expect(board._getBoardPosition(action)).toBe(2);

      action.to.x = 0;
      action.to.y = 1;
      expect(board._getBoardPosition(action)).toBe(3);

      action.to.x = 1;
      action.to.y = 1;
      expect(board._getBoardPosition(action)).toBe(4);

      action.to.x = 2;
      action.to.y = 1;
      expect(board._getBoardPosition(action)).toBe(5);

      action.to.x = 0;
      action.to.y = 2;
      expect(board._getBoardPosition(action)).toBe(6);

      action.to.x = 1;
      action.to.y = 2;
      expect(board._getBoardPosition(action)).toBe(7);

      action.to.x = 2;
      action.to.y = 2;
      expect(board._getBoardPosition(action)).toBe(8);
    });
  });

  describe('available positions', () => {
    it('should return available position indexes', () => {
      board._content = [
        'X', 'O', 'X',
        ' ', 'X', 'O',
        ' ', ' ', 'O'
      ];

      var actual = board._availablePositions();

      expect(actual).toEqual([3, 6, 7]);
    });
  });

  describe('winner', () => {
    it('should be null if game is not started', () => {
      board.join(player1);
      board.join(player2);
      board.ready(player1);

      expect(board.serialize().winner).toBe(null);
    });

    it('should return null if game is started but there is no winner', () => {
      board._nextMove = player1;
      board.join(player1);
      board.join(player2);
      board.ready(player1);
      board.ready(player2);
      board.serialize().content = [
        'X', 'O', 'X',
        ' ', 'O', 'O',
        ' ', ' ', 'O'
      ];
      board.move({
        player: player1,
        to: {
          x: 0,
          y: 1
        }
      });

      expect(board.serialize().winner).toBe(null);
    });

    it('should return winner player1 when player1 is the winner', () => {
      board._nextMove = player1;
      board.join(player1);
      board.join(player2);
      board.ready(player1);
      board.ready(player2);
      board._content = [
        'X', 'O', 'X',
        'X', 'O', 'O',
        ' ', ' ', 'O'
      ];
      board.move({
        player: player1,
        to: {
          x: 0,
          y: 2
        }
      });

      expect(board.serialize().winner).toEqual(player1);
    });
  });

  describe('move order', () => {
    it('should not allow to make 2 moves in a row', () => {
      var result;
      board._nextMove = player1;
      board.join(player1);
      board.join(player2);
      board.ready(player1);
      board.ready(player2);

      result = board.move({
        player: player1,
        to: {
          x: 0,
          y: 0
        }
      });
      expect(result.status).toBe('ok');

      result = board.move({
        player: player1,
        to: {
          x: 1,
          y: 0
        }
      });
      expect(result.status).toBe('error');
      expect(result.description).toBe('Not your turn');
    });
  });
});
