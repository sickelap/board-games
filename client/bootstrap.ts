import {bootstrap} from 'angular2/platform/browser';
import {App} from './components/app/app';

var debug = false;

if (debug) {
  localStorage.debug = '*';
} else if (localStorage.debug) {
  delete localStorage.debug;
}

bootstrap(App);

declare var localStorage: {
  debug: boolean | string;
}
