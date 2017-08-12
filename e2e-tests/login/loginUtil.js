var loginUtil = function () {
    'use strict';

    this.userName = by.css('.userName');
    this.password = by.css('.password');
    this.loginButton = by.css('.loginButton');

    var _ = require('lodash'),
        EC = protractor.ExpectedConditions,
        defaultTimeout = 20000;


    this.login = function (username,password) {
        console.log(username + ':: '+password)
        return element(this.userName).clear().then(function () {
            return element(this.userName).sendKeys(username + '\t').then(function(){
                return element(this.password).clear().then(function () {
                    return element(this.password).sendKeys(password + '\t').then(function(){
                        return this.click(this.loginButton);
                    }.bind(this));
                }.bind(this));
            }.bind(this))
        }.bind(this))
        /*return this.sendText(this.userName, username).then(function () {
            console.log('1 :'+this.userName)
            return this.sendText(this.password, password).then(function () {
                console.log('1 :'+this.userName)
                return this.click(this.loginButton);
            }.bind(this))
        }.bind(this))*/
    };

    this.waitFor = function (locator, timeoutDelay) {
        function internalWaitFor() {
            return new Promise(function (resolve, reject) {
                browser.wait(EC.presenceOf(element(locator)), timeoutDelay || defaultTimeout).then(function () {
                    resolve(element(locator));
                }, reject);
            });
        }

        return retryLoop(internalWaitFor);
    };
};

    var retryLoop = function (functionToRetry) {
        var p = Promise.reject();
        for (var i = 0; i < 5; i++) {
            p = p.catch(functionToRetry);
        }
        return p;
    };

    this.sendText = function (locator, fieldValue) {
        var internalSendText = function () {
            return element(locator).clear().then(function () {
                return element(locator).sendKeys(fieldValue + '\t')
            });
        };
        return retryLoop(internalSendText);
    };

    this.click = function (locator) {
        var internalClick = function () {
            return browser.wait(EC.elementToBeClickable(element(locator)), defaultTimeout).then(function () {
                return this.getAttribute(locator, 'class').then(function (attribute) {
                    //Reject the promise and try again if this is a drop down that is disabled
                    if (_.includes(attribute, 'select2-container-disabled')) {
                        return browser.driver.sleep(1000).then(function () {
                            return Promise.reject();
                        });
                    } else {
                        return element(locator).click();
                    }
                });
            }.bind(this));
        }.bind(this);
        return retryLoop(internalClick);
    };

    this.getAttribute = function (locator, attributeName, timeoutDelay) {
        var internalGetAttribute = function () {
            return this.waitFor(locator, timeoutDelay).then(function (element) {
                return element.getAttribute(attributeName);
            });
        }.bind(this);
        return retryLoop(internalGetAttribute);
    };


module.exports = new loginUtil();
