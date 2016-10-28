var gulp = require("gulp");

var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var watchify = require('watchify');

var watching = false;
gulp.task('enable-watch', function() { watching = true; });

var sass = require('gulp-sass');

function errorHandler(err) {
  console.log('Error: ' + err.message);
}

var paths = {
  statics: 'src/**/*.{html,json,png}',
  css: 'src/**/*.scss',
  build: './build'
};

gulp.task('build:js', function() {
  var bundler = browserify({entries: ['src/app.js']});

  if (watching) {
    bundler.plugin(watchify);
  }
  bundler.on('update', b);

  function b(){
    return bundler
      .transform(babelify)
      .bundle()
      .on('error', errorHandler)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulp.dest(paths.build));
  }

  return b();
});

gulp.task('build:css', function() {
  gulp.src(paths.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.build));
});

gulp.task('build:copy', function() {
  gulp.src(paths.statics)
    .pipe(gulp.dest(paths.build));
});

gulp.task('build', ['build:copy', 'build:css', 'build:js'], function() {
  if (watching) {
    gulp.watch(paths.statics, ['build:copy']);
    gulp.watch(paths.css, ['build:css']);
  }
});
gulp.task('watch', ['enable-watch', 'build']);
