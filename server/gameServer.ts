import {Player, PlayerList} from './player';
import {Game, GameList, GameType, Action} from './game';

export interface PlayGameParams {
  player: Player;
  game: {id?: number, type: GameType};
};

export interface LeaveGameParams {
  playerId: number;
  gameId: number;
};

export interface GameCallback {
  (game: Game): void;
}

export class GameServer {
  games: GameList;
  players: PlayerList;

  constructor(public server: SocketIO.Server) {
    this.games = new GameList();
    this.players = new PlayerList();
    server.on('connect', this.onClientConnect);
  }

  public playAction(params: PlayGameParams, callback: GameCallback): void {
    var player = this.players.findOrCreate(params.player);
    var game = this.games.findGameByPlayer(player);

    if (!game) {
      game = this.games.createGame(params.game.type);
    }

    callback(game);
  }

  public leaveAction(params: LeaveGameParams, callback: GameCallback): void {
    var game: Game;
    callback(game);
  }

  public moveAction(gameId: number, action: Action, callback: GameCallback): void {
    var game: Game;
    callback(game);
  }

  private onClientConnect(socket: SocketIO.Socket): void {
    socket.on('play', this.playAction);
    socket.on('leave', this.leaveAction);
    socket.on('move', this.moveAction);
    this.broadcastGameList();
  }

  private broadcastGameList(): void {
    this.server.emit('gameList', this.games);
  }
}
