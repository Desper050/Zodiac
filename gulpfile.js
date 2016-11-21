'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('app/**/*.scss')
    .pipe(sass())
    .pipe(concat('styles.css'))    
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.scss', ['sass'])
})