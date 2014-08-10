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

  gulp.task('server-watch', [ "server" ], function () {
    var openBrowser = require("open");
     
    openBrowser('http://localhost:9000');

    gulp.watch(options.sourcePaths, [ "server" ]);    
  });

  var nodeInstance;
  gulp.task('server', function () {
    var spawn = require("child_process").spawn;

    if (nodeInstance) {
      nodeInstance.kill();
    }
    
    nodeInstance = spawn('node', [ options.startScriptPath ]);
    nodeInstance.stdout.on('data', function (data) { console.log('' + data); });
    nodeInstance.stderr.on('data', function (data) { console.log('' + data); });
    nodeInstance.on('close', function (code) {
      if (code === 8) {
        console.log('Error detected, waiting for changes...');
      }
    });
  });
};

