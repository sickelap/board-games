var gulp = require('gulp');
//var changed = require('gulp-changed');
//var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
//var rename = require("gulp-rename");
//var browserSync = require('browser-sync').create();
var tsconfig = require('./tsconfig.json');

gulp.task('default', ['build']);

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./client"
    }
  });
});

gulp.task('build', function(done) {
  return runSequence([
    'clientTS', 'serverTS'
  ], done);
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

//gulp.task('watch', function(done) {
//  return runSequence([
//    'clientTS:watch', 'serverTS:watch'
//  ], done);
//});
//
//gulp.task('clientTS:watch', function() {
//  return gulp.watch('src/client/**/*.ts', ['clientTS']);
//});
//
//gulp.task('serverTS:watch', function() {
//  return gulp.watch('src/server/**/*.ts', ['serverTS']);
//});
