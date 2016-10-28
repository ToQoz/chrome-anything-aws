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
      .pipe(gulp.dest('./dist/'));
  }

  return b();
});


gulp.task('build:css', function() {
  gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));

  if (watching) {
    gulp.watch('src/*.scss', ['build:css']);
  }
});

gulp.task('build', ['build:css', 'build:js']);
gulp.task('watch', ['enable-watch', 'build']);
