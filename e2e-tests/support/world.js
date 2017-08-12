function World() {
    'use strict';

    var _ = require('lodash');

    this.expectHelper = function (isTruthy, errorMessage, callback) {
        if (isTruthy) {
            callback();
        }
        else {
            callback(new Error(errorMessage));
        }
    };

    this.isCurrentUrl = function (urlContains, callback) {
        var isSuccess,
            errorMessage;

        browser.getCurrentUrl().then(function (url) {
            isSuccess = url.indexOf(urlContains) !== -1;
            errorMessage = 'Expected to be at the ' + urlContains + ' page. ' + url;

            this.expectHelper(isSuccess, errorMessage, callback);

        }.bind(this));

    };

    this.waitFor = function (locator) {
        return browser.driver.wait(protractor.until.elementLocated(locator), 30000);
    };

    this.waitForRemoval = function (locator) {
        return browser.wait(function () {
            return new Promise(function (resolve) {
                browser.driver.wait(protractor.until.elementLocated(locator)).then(function (result) {
                    resolve(!result);
                });
            });
        }, 60000);
    };

    this.getElement = function (locator) {
        return element(locator);
    };
}

module.exports = function () {
    'use strict';

    this.World = World;
};
