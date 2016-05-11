var gulp = require('gulp');
var rename = require("gulp-rename");
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
  gulp.src(['browser.js'])
    .pipe(rename("webrtc-demos.js"))
    .pipe(browserify())
    .pipe(gulp.dest('./dist'))
});

gulp.task('default', function() {
  gulp.run('browserify');

  gulp.watch("./src/*.js", function() {
    gulp.run('browserify');
  });
});
