import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'site-header',
  templateUrl: 'shared/directives/SiteHeader/SiteHeader.html',
  directives: [RouterLink]
})
export class SiteHeader {
  private username: string;

  constructor() {
    this.username = window.localStorage.getItem('username');
  }
}
