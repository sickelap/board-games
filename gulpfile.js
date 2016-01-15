/* globals jasmine:true */

var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsconfig = require('./tsconfig.json');
var gls = require('gulp-live-server');
var jasmine = require('gulp-jasmine');

gulp.task('default', function(done) {
  runSequence(['build', 'test', 'watch', 'serve'], done);
});

gulp.task('test', function() {
  return gulp.src('spec/**/*.spec.js').pipe(jasmine());
});

gulp.task('serve', function() {
  var server = gls.new('server/app');
  var clientFiles = [
    'client/**/*.css',
    'client/**/*.html',
    'client/**/*.js'
  ];
  var serverFiles = [
    'server/**/*.js'
  ];

  server.start();

  gulp.watch(clientFiles, function(file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch(serverFiles, function() {
    server.start.bind(server)();
  });
});

gulp.task('build', function(done) {
  return runSequence(['clientTS', 'serverTS'], done);
});

gulp.task('clientTS', function() {
  tsconfig.compilerOptions.module = 'system';
  return gulp.src('client/**/*.ts')
    .pipe(ts(tsconfig.compilerOptions)).js
    .pipe(gulp.dest('client'));
});

gulp.task('serverTS', function() {
  tsconfig.compilerOptions.module = 'commonjs';
  return gulp.src(['server/**/*.ts'])
    .pipe(ts(tsconfig.compilerOptions)).js
    .pipe(gulp.dest('server'));
});

gulp.task('watch', function(done) {
  return runSequence(['clientTS:watch', 'serverTS:watch'], done);
});

gulp.task('test:watch', function() {
  return gulp.watch('spec/**/*.spec.js', ['test']);
});

gulp.task('clientTS:watch', function() {
  return gulp.watch('client/**/*.ts', function(done) {
    return runSequence(['clientTS', 'test'], done);
  });
});

gulp.task('serverTS:watch', function() {
  return gulp.watch('server/**/*.ts', function(done) {
    return runSequence(['serverTS', 'test'], done);
  });
});
