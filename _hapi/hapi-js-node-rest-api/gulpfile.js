/***
 *
 * GulpJS file v.0.1
 *
 * @author : Fat Elvis featuring Monkey Bob
 *
 * @type {*|exports|module.exports}
 */


var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps');


// WATCH
gulp.task('watch', function () {

    gulp.watch(['./app/components/**/*.js', './app/app.js'], ['js']);

});


// CSS & SASS
gulp.task('sass', function () {
    gulp.src('./app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('source-maps'))
        .pipe(rename('build.css'))
        .pipe(gulp.dest('./app/css/'));
});

// JAVASCRIPT
gulp.task('js', function () {

    return gulp.src([

      // add JS files

    ])
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/'));


});

// DEFAULT
gulp.task('default', [
    'sass',
    'js',
    'watch'
]);