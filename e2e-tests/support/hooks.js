var fs = require('fs'),
    _ = require('lodash'),
    Cucumber = require('cucumber');

    cucumberHooks = function () {
        'use strict';

        this.BeforeFeature(function (feature, callback) {
            browser.driver.sleep(Math.random() * 45000).then(function(){
                callback();
            });
        });

        this.BeforeScenario(function (scenario, callback) {
            callback();
        });

        this.BeforeStep(function (step, callback) {
            callback();
        });

        this.Before(function (scenario, callback) {
            callback()
        });

        this.After(function (scenario, callback) {
            callback()
        });







        function clearLocalStorage() {
            return browser.executeScript('window.localStorage.clear();');
        }

    };

module.exports = cucumberHooks;
