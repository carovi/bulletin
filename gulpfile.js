var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch')

gulp.task('css', function() {
  return gulp.src('main.sass')
  .pipe(sass())
  .pipe(gulp.dest('./build/'))
})

gulp.task('js', function () {
  return browserify('./colors.js', {debug: true, extensions: ['es6']})
      .transform("babelify", {presets: ["env"]})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./build/'))
});

gulp.task('all', ['js', 'css'])
