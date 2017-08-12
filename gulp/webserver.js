(function () {
    'use strict';

    var gulp = require('gulp'),
        webserver = require('gulp-webserver'),
        browserSyncServer = require('browser-sync');

    function proxyLocal() {
        return setupWebserver('http://localhost:8080');
    }

    function browserSync(basePath) {

        var syncOptions = {
            // Stop the browser from automatically opening
            open: false,
            // proxy already running server
            proxy: 'localhost:' + 8989,
            // Use a specific port
            port: 8990,
            files: [
                basePath + '/app/view/*.html',
                basePath + '/app/view/*.js',
                basePath + '/app/*.css'
            ]
        };

        browserSyncServer.init(syncOptions);
    }

    function setupWebserver(proxyUrl) {

     //   var path = './build/dev/';
        var path = '/app';

        browserSync(path);

        return gulp.src(path)
            .pipe(webserver({
                livereload: false,
                directoryListing: false,
                port: 8990,
                middleware: [
                    securityHeaders
                ],
                    proxies: [
                    {
                        source: '/rest',
                        target: proxyUrl + '/rest'
                    }
                ]
            }));
    }

    function securityHeaders(req, res, next) {
        contentSecurityPolicyMock(res);
        contentTypeOptions(res);
        frameOptions(res);
        xssProtection(res);
        referrerPolicy(res);

        next();
    }

    // Mimic the Content-Security-Policy-Report-Only header from the real UMS Server
    function contentSecurityPolicyMock(res) {
        var csp = 'default-src \'none\'; ' +
            'base-uri \'self\'; ' +
            'script-src \'self\' \'unsafe-inline\'; ' +
            'connect-src \'self\' ws://localhost:8990; ' +
            'img-src \'self\' data:; ' +
            'style-src \'self\' \'unsafe-inline\'; ' +
            'font-src \'self\'; ' +
            'media-src \'self\'; ' +
            'object-src \'self\'; ' +
            'frame-src \'self\' www.bing.com; ' +
            'frame-ancestors \'self\'; ' +
            'plugin-types application/pdf; ' +
            'report-uri /contentSecurityPolicyReport;';
        res.setHeader('Content-Security-Policy-Report-Only', csp);
        res.setHeader('X-Content-Security-Policy', csp);
    }

    function contentTypeOptions(res) {
        res.setHeader('X-Content-Type-Options', 'nosniff');
    }

    function frameOptions(res) {
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    }

    function xssProtection(res) {
        res.setHeader('X-XSS-Protection', '1; mode=block');
    }

    function referrerPolicy(res) {
        res.setHeader('Referrer-Policy', 'no-referrer');
    }

    module.exports = {
        proxyLocal: proxyLocal
    };
})();

