let gulp = require('gulp');
let sass = require('gulp-sass');
let prefix = require('gulp-autoprefixer');
let wrap = require('gulp-wrap');
let browserSync = require('browser-sync');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('browser-sync',['build', 'sass'], () => {
  browserSync({
    server: {
      baseDir: '..' // 基地建在那个文件夹,即index.html等
    }
  });
});

gulp.task('build', () => {
  gulp.src('pages/*.html')
    .pipe(wrap({src: 'layout/default.html'}))
    .pipe(gulp.dest('..'));
});

gulp.task('sass', () => {
  gulp.src('styles/main.scss')
    .pipe(sass()).on('error', handleError)
    .pipe(prefix())
    .pipe(gulp.dest('../styles'))
    .pipe(browserSync.reload({stream: true}));
});

/*gulp.task('cp', () => {
  gulp.src('index.html')
    .pipe(gulp.dest('..'));
});*/

gulp.task('rebuild', ['build'], () => {
  browserSync.reload(); // 浏览器自动刷新
});

gulp.task('watch', () => {
  gulp.watch(['**/*.html'], ['rebuild']);
  gulp.watch(['styles/*.scss'], ['sass']);
});

gulp.task('default', ['browser-sync', 'watch']);

