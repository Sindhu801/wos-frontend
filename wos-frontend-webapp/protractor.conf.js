'use strict';

exports.config = {
  baseUrl: 'https://local.1p.thomsonreuters.com:6789/#/',
  capabilities: {
    browserName: 'chrome'
  },
  rootElement: 'body',
  getPageTimeout: 5000,
  framework: 'mocha',
  mochaOpts: {
    reporter: 'spec',
    slow: 3000
  },
  chromeDriver: './node_modules/protractor/selenium/chromedriver',
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  specs: ['./test/e2e/**/*.js']
};
