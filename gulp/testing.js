"use strict";

var gulp = require('gulp');   

module.exports = function (options) {  
  gulp.task('test', function () {
    var mocha = require("gulp-mocha");
    require('mocha-unfunk-reporter').option('style', 'plain');
    
    return gulp.src(options.testPaths, {read: false})
      .pipe(mocha({ reporter: 'mocha-unfunk-reporter' }))
      .on('error', handleError);
  });

  gulp.task("test-watch", ["test"], function () { 
    var _ = require("lodash"),
      watchPaths = _.union(options.sourcePaths, options.testPaths);    

      console.log(JSON.stringify(watchPaths));
    return gulp.watch(watchPaths, ["test"]);  
  });

  gulp.task("test-coverage", function () { 
    var istanbul = require('gulp-istanbul'),
        mocha = require("gulp-mocha"),
        openBrowser = require("open");

    require('mocha-unfunk-reporter').option('style', 'plain');

    return gulp.src(options.sourcePaths)
        .pipe(istanbul()) // Covering files
        .on('end', function () {
            return gulp.src(options.testPaths, {read: false})
              .pipe(mocha({ reporter: 'mocha-unfunk-reporter' }))
              .pipe(istanbul.writeReports()) // Creating the reports after tests run
              .on('end', function () {
                openBrowser('./coverage/lcov-report/index.html');
              });
        });  
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

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

