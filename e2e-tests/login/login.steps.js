var loginSteps = function () {
  'use strict';
    var loginUtil = require('./loginUtil.js');


    this.Given(/^User is on login page$/, function () {
        return browser.get('http://localhost:8001/#/login');
    });

    this.When(/^User entered username as (.*) and password as (.*)$/, function (userName,password) {
        return loginUtil.login(userName,password);
    });

};
module.exports = loginSteps;
