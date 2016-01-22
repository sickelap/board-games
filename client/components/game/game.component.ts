import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {GameService} from 'services/GameService'

@Component({
  selector: 'game',
  templateUrl: 'components/game/game.component.html',
  directives: [RouterLink],
  providers: [GameService]
})
export class GameComponent {
  constructor(private gameService: GameService) {}
}
