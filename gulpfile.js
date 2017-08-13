var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    path = require('path'),
    protractor = require('gulp-protractor').protractor,
    connect = require('gulp-connect'),
    proxy = require('http-proxy-middleware');


gulp.task('connect', function() {
    connect.server({
        port:8001,
        root: 'app',
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/rest', {
                    target: 'http://localhost:8080',
                    changeOrigin:true
                })
            ]
        }
    });
});


gulp.task('webserver', function() {
    gulp.src( 'app' )
        .pipe(webserver1({
            livereload: true,
            directoryListing: true
        }));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
/*gulp.task('less', function() {
    return gulp.src('less/!*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});*/

/*gulp.task('less', function () {
    return gulp.src('./!**!/!*.less')
        .pipe(less())
        .pipe(gulp.dest('./app/assets/css/'));
});*/

gulp.task('less', function () {
    return gulp.src('./app/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/css'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
/*gulp.task('default', ['lint', /!*'sass',*!/ 'scripts', 'watch',function(){
    return webserver.proxyLocal();
}]);*/

gulp.task('runLocal', ['lint', 'scripts','watch', 'connect','less'], function () {

});


gulp.task('runProtractor', function () {
     'use strict';
     gulp.src([
         'e2e-tests/login/'
     ])
         .pipe(protractor({
             configFile: 'e2e-tests/protractor.conf.js',
             keepAlive: true,
             args: null
         }))
 });

gulp.task('open', function(){
    gulp.src('app/index.html/login')
        .pipe(open());
});