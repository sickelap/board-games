import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from 'angular2/router';
import {LobbyPage} from 'pages/lobby/lobby';
import {GamePage} from 'pages/game/game';
import {TicTacToe} from 'pages/game/games/TicTacToe/TicTacToe';
import {ProfilePage} from 'pages/profile/profile';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
  { path: '/', as: 'Lobby', component: LobbyPage, useAsDefault: true },
//  { path: '/game/...', as: 'Game', component: GamePage },
  { path: '/game/tic-tac-toe', as: 'Game', component: TicTacToe },
  { path: '/profile', as: 'Profile', component: ProfilePage}
])
export class Main {
  constructor(private router: Router) {
    if (!localStorage.getItem('username')) {
      this.router.navigate(['Profile']);
    }
  }
}
