import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

@Component({
  selector: 'app',
  template: 'hi there',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/', useAsDefault: true }
])
export class App {

}
