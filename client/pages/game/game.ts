import {Component} from 'angular2/core';
import {RouterLink, RouteConfig} from 'angular2/router';
import {GameService} from 'shared/services/GameService';
import {TicTacToe} from 'pages/game/games/TicTacToe/TicTacToe';

@Component({
  selector: 'game',
  templateUrl: 'pages/game/game.html',
  directives: [RouterLink],
  providers: [GameService]
})
@RouteConfig([
  { path: '/tic-tac-toe', as: 'TicTacToe', component: TicTacToe, useAsDefault: true },
])
export class GamePage {
  constructor(private gameService: GameService) {}
}
