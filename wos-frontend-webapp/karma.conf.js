'use strict';

//var gulp = require('gulp');
var wiredep = require('wiredep');

var bowerFiles = wiredep().js;

var appFiles = [
  '../mocha.conf.js',
  '../src/modules/**/*-module.js',
  '../dest/ipa/assets/js/wos-templates.js',
  '../src/modules/**/**/*.js',
  '../src/modules/**/templates/*.html',
  {pattern: '../src/assets/img/**/*', watched: false, included: false, served: true}
];

var mockFiles = [
  './mock/*.mock.json'
];

module.exports = function (config) {
  var conf = {
    basePath: './test',
    frameworks: ['mocha', 'chai', 'sinon-chai', 'dirty-chai'],
    browsers: ['PhantomJS'],
    autoWatch: false,
    singleRun: true,
    colors: true,
    junitReporter: {
      outputFile: '../../reports/test-results/test-results.xml'
    },
    reporters: ['junit', 'dots'],
    reportSlowerThan: 1000,
    browserDisconnectTimeout: 2000,
    browserDisconnectTolerance: 0,
    browserNoActivityTimeout: 5000,
    logLevel: config.LOG_WARN,
    preprocessors: {
      '../src/modules/**/*.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: '.*/ipa-frontend-webapp/src/'
    },
    proxies: {
      '/assets/': __dirname + '/src/assets/',
      '/modules/': __dirname + '/src/modules/'
    },

    files: [].concat(bowerFiles, appFiles, mockFiles),
    exclude: [
      '../src/modules/components/linkedin-insights/run/linkedin-insight-run.js',
      '../src/modules/components/social-share/run/facebook-run.js'
    ]
  };

  config.set(conf);

  return conf;
};
