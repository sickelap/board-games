/* globals jasmine:true */

var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsconfig = require('./tsconfig.json');
var gls = require('gulp-live-server');
var jasmine = require('gulp-jasmine');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

gulp.task('default', function(done) {
  runSequence('build', 'test', 'watch', 'serve', done);
});

gulp.task('build', ['clientTS', 'serverTS']);

gulp.task('watch', ['build:watch', 'test:watch']);

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

  gulp.watch(clientFiles, function(file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch(serverFiles, function() {
    server.start.bind(server)();
  });

  return server.start();
});

gulp.task('build:watch', function() {
  var watchList = ['server/**/*.ts', 'client/**/*.ts'];
  gulp.watch(watchList, function() {
    runSequence(['serverTS', 'clientTS'], 'test');
  });
  gulp.watch('client/**/*.scss', ['sass']);
});

gulp.task('test:watch', function() {
  gulp.watch('spec/**/*.spec.js', ['test']);
});

gulp.task('clientTS', function() {
  Object.assign(tsconfig.compilerOptions, {
    module: 'commonjs'
  });
  return gulp.src('client/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsconfig.compilerOptions)).js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client'));
});

gulp.task('serverTS', function() {
  Object.assign(tsconfig.compilerOptions, {
    module: 'commonjs'
  });
  return gulp.src(['server/**/*.ts'])
    .pipe(ts(tsconfig.compilerOptions)).js
    .pipe(gulp.dest('server'));
});

gulp.task('test', function() {
  return gulp.src('spec/**/*.spec.js').pipe(jasmine());
});

gulp.task('sass', function() {
  gulp.src('client/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('client/styles'));
});
