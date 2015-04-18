/*jshint node:true*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var sync = require('browser-sync');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browser-sync', function() {
  sync({
    server: {
      baseDir: '.'
    },
    port: process.env.PORT || 8080
  });
});

gulp.task('browserify', function(){
  var b = watchify(browserify());

  var rebundle = function () {
    gutil.log(gutil.colors.green('rebundle...'));
    return b.bundle().pipe(source('winternote.js'))
                     .pipe(gulp.dest('./dist'));
  };

  b.transform(reactify);
  b.add('./src/app.jsx');

  return rebundle();
});

gulp.task('reload-jsx', ['browserify'], function(){
  sync.reload();
});

gulp.task('watch', ['browserify', 'browser-sync'], function() {
  gulp.watch('src/**/*.jsx', ['reload-jsx']);

  gutil.log(gutil.colors.green('Watching for changes...'));
});


gulp.task('default', ['watch']);
