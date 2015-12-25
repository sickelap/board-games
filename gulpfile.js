'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  jasmine = require('gulp-jasmine');

var files = {
  client: 'client/js/**/*.js',
  server: 'server/**/*.js',
  specs: 'spec/**/*.spec.js'
};

gulp.task('jshint', function() {
  var code = [].concat(files.client, files.server, files.specs);
  return gulp.src(code)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src(files.specs).pipe(jasmine());
});

gulp.task('watch', function() {
  var code = [].concat(files.client, files.server, files.specs);
  return gulp.watch(code, ['jshint', 'test']);
});

gulp.task('default', ['jshint', 'test', 'watch']);

