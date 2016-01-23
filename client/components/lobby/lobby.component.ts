import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {GameService} from '../../services/GameService';

@Component({
  selector: 'lobby',
  templateUrl: 'components/lobby/lobby.component.html',
  directives: [RouterLink, CORE_DIRECTIVES],
  providers: [GameService]
})
export class LobbyComponent {
  private games: Array<any>;

  constructor(private gameService: GameService) {
    this.gameService.getGames().then(list => this.games = list);
  }
}
