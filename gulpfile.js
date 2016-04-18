'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); // para no requerir todos los plugins de gulp
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
    return gulp.src('app/styles/default.scss')
        .pipe($.sourcemaps.init())
          .pipe($.plumber())
          .pipe($.sass())
          .pipe($.shorthand())
          .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
          .pipe($.cssmin())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('app/styles/css'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('inject', function () {
    var target = gulp.src('app/index.html');
    var sources = gulp.src(['app/styles/css/*.css'], {read: false});
    return target.pipe($.inject(sources, {relative: true}))
        .pipe(gulp.dest('./app'));
});

gulp.task('watch', function(){
    gulp.watch('app/index.html').on('change', browserSync.reload);
    gulp.watch('app/styles/*.scss', ['sass']);

});

gulp.task('default', ['sass', 'browser-sync', 'watch', 'inject']);
