import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {GameService} from 'services/GameService'

@Component({
  selector: 'lobby',
  templateUrl: 'components/lobby/lobby.component.html',
  directives: [RouterLink],
  providers: [GameService]
})
export class LobbyComponent {
  constructor(private gameService: GameService) {}
}
