let gulp = require('gulp');
let sass = require('gulp-sass');
let prefix = require('gulp-autoprefixer');
let wrap = require('gulp-wrap');
let browserSync = require('browser-sync');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('build', () => {
  gulp.src('pages/*.html')
    .pipe(wrap({src: 'layout/default.html'}))
    .pipe(gulp.dest('..'));
});

gulp.task('sass', () => {
  gulp.src('styles/main.scss')
    .pipe(sass()).on('error', handleError)
    .pipe(prefix())
    .pipe(gulp.dest('../styles'));
});

/*gulp.task('cp', () => {
  gulp.src('index.html')
    .pipe(gulp.dest('..'));
});*/

gulp.task('watch', () => {
  gulp.watch(['**/*.html'], ['build']);
  gulp.watch(['styles/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'build', 'watch']);

