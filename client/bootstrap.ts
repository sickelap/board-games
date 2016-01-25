import {bootstrap} from 'angular2/platform/browser';
import {bind} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Main} from 'pages/main';

var debug = false;

if (debug) {
  localStorage.debug = '*';
} else if (localStorage.debug) {
  delete localStorage.debug;
}

bootstrap(Main, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  bind(LocationStrategy).toClass(HashLocationStrategy)
]);

declare var localStorage: {
  debug: boolean | string;
}
