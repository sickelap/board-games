import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from 'angular2/router';
import {LobbyComponent} from '../lobby/lobby.component';
import {GameComponent} from '../game/game.component';
import {TicTacToe} from '../game/boards/tic-tac-toe/board.component';
import {ProfileComponent} from '../profile/profile.component';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
  { path: '/', as: 'Lobby', component: LobbyComponent, useAsDefault: true },
  //{ path: '/game/...', as: 'Game', component: GameComponent },
  { path: '/game', as: 'Game', redirectTo: ['Lobby'] },
  { path: '/game/tic-tac-toe', as: 'TicTacToe', component: TicTacToe },
  { path: '/profile', as: 'Profile', component: ProfileComponent }
])
export class App {
  constructor(private router: Router) {
    if (!localStorage.getItem('username')) {
      this.router.navigate(['Profile']);
    }
  }
}
