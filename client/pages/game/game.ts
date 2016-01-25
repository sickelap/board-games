import {Component} from 'angular2/core';
import {RouterLink, RouteConfig} from 'angular2/router';
import {TicTacToe} from 'pages/game/games/TicTacToe/TicTacToe';
import {SiteHeader} from 'shared/directives';

@Component({
  selector: 'game',
  templateUrl: 'pages/game/game.html',
  directives: [RouterLink,SiteHeader]
})
@RouteConfig([
  { path: '/', as: 'Game', component: GamePage, useAsDefault: true },
  { path: '/tic-tac-toe', as: 'TicTacToe', component: TicTacToe }
])
export class GamePage {}
