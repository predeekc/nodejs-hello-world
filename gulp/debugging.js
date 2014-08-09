"use strict";

var gulp = require('gulp');

module.exports = function (options) {
  gulp.task("debugger", function () {
    var spawn = require("child_process").spawn,
      openBrowser = require("open");

    var node = spawn(
      process.platform === "win32" ? "node-inspector.cmd" : "node-inspector", 
      [ '--no-preload' ], 
      { stdio: 'inherit' });
    node.on("error", function (err) {
      console.log(err);
    });
    node.on('close', function (code, signal) {
      console.log('child process terminated due to receipt of signal '+signal);
    });
    openBrowser('http://localhost:8080/debug?port=5858');
  });

  gulp.task('serve', function () {
    var nodemon = require("gulp-nodemon"),
      openBrowser = require("open");

    var options = {
      "script": options.startScriptPath,
      "watch": options.sourcePaths,
      "ext": "js",
      "stdout": false,
      "nodeArgs": ["--debug"]
    };

    nodemon(options)
      .on('restart', function () {
        console.log('restarted!');
      });
    openBrowser('http://localhost:9000');
  });
};

