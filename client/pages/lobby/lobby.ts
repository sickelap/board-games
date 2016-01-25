import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {GameService} from 'shared/services/GameService';

@Component({
  selector: 'lobby',
  templateUrl: 'pages/lobby/lobby.html',
  directives: [RouterLink, CORE_DIRECTIVES],
  providers: [GameService]
})
export class LobbyPage {
  private games: Array<any>;

  constructor(private gameService: GameService) {
    this.gameService.getGames().then(list => this.games = list);
  }
}
