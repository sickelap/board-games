import {Component} from 'angular2/core';
import {RouterLink, RouteConfig} from 'angular2/router';
import {GameService} from 'services/GameService';
import {TicTacToe} from './boards/tic-tac-toe/board.component';

@Component({
  selector: 'game',
  templateUrl: 'components/game/game.component.html',
  directives: [RouterLink],
  providers: [GameService]
})
@RouteConfig([
  { path: '/tic-tac-toe', as: 'TicTacToe', component: TicTacToe },
])
export class GameComponent {
  constructor(private gameService: GameService) {}
}
