var gulp = require('gulp');
//var webserver = require('gulp-webserver');
// Include Our Plugins
var jshint = require('gulp-jshint');
var webserver = require('./gulp/webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var protractor = require('gulp-protractor').protractor;


var server = {
    host: 'localhost',
    port: '8001'
}


gulp.task('one',function(){
   console.log('gulp running')
})

/* gulp.task('webserver', function() {
     gulp.src('app')
         .pipe(webserver({
            fallback: 'index.html'
         }));
});*/

gulp.task('webserver', function() {
    gulp.src( 'app' )
        .pipe(webserver({
            fallback: 'index.html',
            host:             server.host,
            port:             server.port,
            livereload:       true,
            directoryListing: false,
            proxies: [
                {
                    source: '/login',
                    target: 'http://localhost:8001/view'
                }
                    ]
        }));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('less', function() {
    return gulp.src('less/!*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
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

gulp.task('runLocal', ['lint', 'scripts','watch'], function () {
 //   watch.localDevWatch();
    return webserver.proxyLocal();
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