'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var gcmq = require('gulp-group-css-media-queries');

// sass
gulp.task('sass', function () {
  return gulp.src('./app/sass/main.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream())
});

// reload
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "brickenter/app/"
    });
});

// watch
gulp.task('watch', function () {
  gulp.watch('./app/**/*.scss', ['sass']);
  gulp.watch(["./app/**/*.php"]).on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'browser-sync', 'watch']);