//features/step_definitions/my_step_definitions.js
var loginSteps = function () {

 //  'use strict';
    var loginUtil = require('./loginUtil.js');


    this.Given(/^User is on login page$/, function () {
        return browser.get('http://localhost:8000/#/login');
    });

    this.When(/^User entered username as (.*) and password as (.*)$/, function (userName,password) {
        return loginUtil.login(userName,password);
    });

    /*this.Then(/^user should appear as offline$/, function (callback) {
        var isSuccess,
            errorMessage = 'User is online';
        commonUtilities.waitForRemoval(onlineUserIcon).then(function () {
            this.expectHelper(true, errorMessage, callback);
        }.bind(this), function () {
            this.expectHelper(false, errorMessage, callback);
        }.bind(this));
    });*/





      //  browser.waitFor(loginUtil.userName,10000).then(function(){
            //callback();
       // });


        /*return browser.get('http://localhost:8000/#/login').then(function(){
                callback();
            });*/





};
module.exports = loginSteps;
