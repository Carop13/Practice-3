'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); // para no requerir todos los plugins de gulp
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
    return gulp.src('app/styles/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
          .pipe($.sass({errLogToConsole: true}))
          .pipe($.shorthand())
          .pipe($.autoprefixer("last 1 versions", "> 10%", "ie 9"))
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

    gulp.watch('app/**/*.html').on('change', browserSync.reload);
    gulp.watch('app/styles/**/*.scss', ['sass']);
});

gulp.task('inject', function () {
    var target = gulp.src('app/index.html');
    var sources = gulp.src(['app/styles/css/*.css'], {read: false});
    return target.pipe($.inject(sources, {relative: true}))
        .pipe(gulp.dest('./app'));
});

gulp.task('watch', function(){
    gulp.watch('app/**/*.html').on('change', browserSync.reload);
    gulp.watch('app/styles/**/*.scss', ['sass']);

});

gulp.task('default', ['sass', 'browser-sync', 'watch', 'inject']);
