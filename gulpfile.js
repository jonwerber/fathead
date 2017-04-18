var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
//var uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var stripCssComments = require('gulp-strip-css-comments');
var del = require('del');


gulp.task('sass', function () {
    return gulp.src('./*.scss') // Gets all files ending with .scss in root
        .pipe(stripCssComments())
        .pipe(sass())
        //add browser prefixes to simplify dev process (ie.
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('./*.scss', ['sass']);
    gulp.watch('./*.html', browserSync.reload);
    //gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function () {
    // for simplification of dev process
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
});

gulp.task('clean:dist', function () {
    return del.sync('dist');
});

gulp.task('build', function (callback) {
    //hypothetical deletion of dist folder src for real world structure & deployment
    runSequence('clean:dist',
        ['sass'],
        callback
    )
});

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});