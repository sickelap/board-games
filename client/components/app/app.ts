import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {LobbyComponent} from '../lobby/lobby.component';
import {GameComponent} from '../game/game.component';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
  { path: '/', as: 'Lobby', component: LobbyComponent, useAsDefault: true },
  { path: '/game', as: 'Game', component: GameComponent }
])
export class App { }
