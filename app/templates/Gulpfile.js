var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require('path');
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var nodemon = require('nodemon');

/********************
 * Helper functions
 ********************/

function onServerLog(log) {
  console.log(plugins.util.colors.white('[') +
    plugins.util.colors.yellow('nodemon') +
    plugins.util.colors.white('] ') +
    log.message);
}

function checkAppReady(cb) {
  var options = {
    host: 'localhost',
    port: config.port,
  };
  http
    .get(options, function () {
      cb(true)
    })
    .on('error', function () {
      cb(false)
    });
}

// Call page until first success
function whenServerReady(cb) {
  var serverReady = false;
  var appReadyInterval = setInterval(function () {
    checkAppReady(function (ready) {
      if (!ready || serverReady) {
        return;
      }
      clearInterval(appReadyInterval);
      serverReady = true;
      cb();
    })
  }, 100);
}


gulp.task('client:dev', function () {
  var config = require('dev_webpack.js');
  new webpackDevServer(config)
    .listen(8000, 'localhost', function (err) {
      if (err) throw new gutil.PluginError("client:dev", err);
    });
});

gulp.task('client:build', function () {
  var config = require('build_webpack.js');
  webpack(config, function (err, stats) {
    if (err) throw new gutil.PluginError("client:build", err);
    gutil.log("client:build", stats.toString());
  });
});


gulp.task('start:server', function () {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  config = require('./server/config/environment');
  nodemon('-w lib server/app.js')
    .on('log', onServerLog);
});
