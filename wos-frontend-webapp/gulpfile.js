'use strict';

var loadPluginsConfig = require('./pipelines/configs/load-plugin-config.json');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(loadPluginsConfig);

//main set of build tasks
var commonBuildTasks = ['js:lint', 'js:build', 'less:build', 'bower:copy:all', 'copy:assets:all'];

//load custom gulp tasks
plugins.requireDir('../../pipelines');

//build the application for local development or production deployment
gulp.task('build', function (local, development, production, show, ipacontext) {

  if (local) {
    plugins.util.log(plugins.util.colors.green('--local flag set, building application for local development'));

    // run main build tasks
    // then inject JS / CSS dependencies into index.html
    // move the build to /ui/demo/
    // serve, watch
    // then cleanup
    plugins.runSequence('clean:dest', commonBuildTasks, ['template:build:local'], ['serve', 'watch']);

  } else if (development) {
    plugins.util.log(plugins.util.colors.green('--local flag set, building application for local development'));
    plugins.runSequence('clean:dest', commonBuildTasks, ['template:build:local']);
  } else if (production) {
    plugins.util.log(plugins.util.colors.green('--production flag set, building application for production deployment'));

    if (show) {
      plugins.util.log(plugins.util.colors.green('--show flag set, will build for production and host on local webserver'));

      plugins.runSequence('clean:dest', commonBuildTasks, ['template:build:prod'], ['serve']);
    } else {
      plugins.runSequence('clean:dest', commonBuildTasks, ['template:build:prod', 'copy:assets:robots'], ['test:ci']);
    }
  } else if (ipacontext) {
    plugins.util.log(plugins.util.colors.green('--ipacontext flag set, building application for local development with contextPath /ipa'));
    plugins.runSequence('clean:dest', commonBuildTasks, ['template:build:local'], ['copy:dest:ipa'], ['serve', 'watch']);
  }
});

gulp.task('develop', function() {
  plugins.util.log(plugins.util.colors.green('--ipacontext flag set, building application for local development with contextPath /ipa'));
  plugins.runSequence('clean:dest', commonBuildTasks, ['template:build:local'], ['copy:dest:ipa'], ['serve', 'watch']);
});

gulp.task('dev', function () {

  plugins.util.log(plugins.util.colors.red('gulp dev not supported, please use gulp build --local'));

});
