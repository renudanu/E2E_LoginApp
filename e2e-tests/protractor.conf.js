exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    baseUrl: 'http://localhost:8000/#/login',

    capabilities: {
        browserName: 'chrome',
        // shardTestFiles: true,
        // maxInstances: 4,
        // count: 2,
        'chromeOptions': {'args': ['--start-maximized']},
        specs: '**/*.feature'
    },

    onPrepare: function () {
        browser.get('');
     //   global.constants = require('./step_definitions/core/globalConstants.js');
    },

    allScriptsTimeout: 60000,
    getPageTimeout: 50000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
   // resultJsonOutputFile: 'tests/e2e/report.json',
    ignoreUncaughtExceptions: true,

    cucumberOpts: {
       // require: ['**/*.js'],
        require: ["../e2e-tests/**/*.js"],
        format: 'pretty',
        tags: ''
    }
};



/*
exports.config = {
    // set to "custom" instead of cucumber.
    framework: 'custom',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    // require feature files
    specs: [
        '**!/!*.feature' // accepts a glob
    ],

    cucumberOpts: {
        // require step definitions
        require: [
            '**!/!*.steps.js' // accepts a glob
        ]
    }
};*/

/*
Basic configuration to run your cucumber
feature files and step definitions with protractor.
**/
//protractor.conf.js
/*
exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    framework: 'custom',
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to this directory.
    specs: [
        'login/!*.feature'
    ],

    baseURL: 'http://localhost:8000/',

    cucumberOpts: {
        require: 'login/loginStep.js',
        tags: false,
        format: 'pretty',
        profile: false,
        'no-source': true
    }
};
*/
