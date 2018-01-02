var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer')

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