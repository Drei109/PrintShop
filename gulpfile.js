var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

var target = {
    sass_src : 'scss/*.scss',
    css_dist : 'css'
};

gulp.task('sass', function () {
    return gulp.src(target.sass_src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
                    browsers: ['last 5 versions','> 1%',
                        'ie 8',
                        'ie 9',
                        'ios 6',
                        'android 4'],
                    cascade: true
                }))
        .pipe(gulp.dest(target.css_dist))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){

    /* Para todos los archivos y carpetas dentro de la carpeta scss
        gulp.watch('./scss/!**!/!*.scss', ['sass']);
*/

    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('./*.html', browserSync.reload);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server:{
            baseDir: './'
        }
    })
});

gulp.task('default',['sass', 'watch']);



//gulp.task('sass', function () {
//    gulp.src('./style.scss')
//        .pipe(sass().on('error', sass.logError))
//        .pipe(autoprefixer({
//            browsers: ['last 5 versions'],
//            cascade: true
//        }))
//        .pipe(gulp.dest('./'))
//        .pipe(browserSync.stream());
//});
//
//gulp.task('default', function () {
//    browserSync.init({
//        server: "./"
//    });
//    gulp.watch('./style.scss', ['sass']);
//    gulp.watch('./*.html').on('change', browserSync.reload);
//});