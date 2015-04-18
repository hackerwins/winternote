/*jshint node:true*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var sync = require('browser-sync');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var rename = require('gulp-rename');

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

gulp.task('compile-less', function () {
  return gulp.src('src/**/*.less').pipe(less())
                                  // for dist/winternote.css
                                  .pipe(rename(function (path) {
                                    path.dirname = '';
                                    return path;
                                  }))
                                  .pipe(gulp.dest('./dist'));
});

gulp.task('reload-jsx', ['browserify'], function(){
  sync.reload();
});

gulp.task('reload-less', ['compile-less'], function(){
  sync.reload();
});

gulp.task('watch', ['browserify', 'compile-less', 'browser-sync'], function() {
  gulp.watch('src/**/*.jsx', ['reload-jsx']);
  gulp.watch('src/**/*.less', ['reload-less']);

  gutil.log(gutil.colors.green('Watching for changes...'));
});


gulp.task('default', ['watch']);
