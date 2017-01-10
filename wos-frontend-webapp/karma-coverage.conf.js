'use strict';

module.exports = function (config) {
  var conf = require('./karma.conf.js')(config);

  conf.reporters.push('coverage');

  conf.preprocessors['../src/modules/**/**/!(*.test).js'] = ['coverage'];

  conf.coverageReporter = {
    dir: '../reports/test-coverage/',
    subdir: function(browser) {
      // normalization process to keep a consistent browser name across different OS
      return browser.toLowerCase().split(/[ /-]/)[0];
    },
    reporters: [
      { type: 'html', file: 'coverage.html' },
      { type: 'cobertura', file: 'coverage.xml'},
      { type: 'json' },
      { type: 'lcov' },
      { type: 'text-summary'}
    ]
  };

  config.set(conf);
};
