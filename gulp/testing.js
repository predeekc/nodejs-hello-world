"use strict";

var gulp = require('gulp');  

module.exports = function (options) {  
  gulp.task('test', function () {
    var mocha = require("gulp-mocha");
    require('mocha-unfunk-reporter').option('style', 'plain');
    
    return gulp.src(options.testPaths, {read: false})
      .pipe(mocha({ reporter: 'mocha-unfunk-reporter' }));
  });

  gulp.task("test-watch", ["test"], function () { 
    var _ = require("lodash"),
      watchPaths = _.union(options.sourcePaths, options.testPaths);    

    return gulp.watch(watchPaths, ["test"]);  
  });

  gulp.task('test-debug', function () {
    var mocha = require("gulp-spawn-mocha");

    return gulp.src(options.testPaths, {read: false})
      .pipe(mocha({
        bin: process.platform === "win32" ? "mocha.cmd" : "mocha",
        R: 'mocha-unfunk-reporter',
        env: {'mocha-unfunk-style': 'plain' },
        debug: true,
        "debug-brk": true      
      }))
      .on('error', console.warn.bind(console));
  });
};