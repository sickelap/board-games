'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var gls = require('gulp-live-server');

var server = gls.new('server/app');
var clientFiles = [
  'client/**/*.css',
  'client/**/*.html',
  'client/**/*.js'
];
var serverFiles = [
  'server/**/*.js'
];

gulp.task('serve', function() {
  gulp.watch(clientFiles, function(file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch(serverFiles, function() {
    server.start.bind(server)();
  });

  return server.start();
});

gulp.task('default', ['serve']);
