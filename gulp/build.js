"use strict";

var gulp = require('gulp');

module.exports = function(options) {
  gulp.task('build:clean', function() {
    var clean = require("gulp-clean");
    return gulp.src('build').pipe(clean());
  });

  gulp.task('build:client', ['build:clean'], function() {
    var usemin = require('gulp-usemin');
    var uglify = require('gulp-uglify');
    var minifyHtml = require('gulp-minify-html');
    var minifyCss = require('gulp-minify-css');
    var rev = require('gulp-rev');

    var ngmin = require('gulp-ngmin');
    var cdnizer = require("gulp-cdnizer");
    //   var imagemin = require('gulp-imagemin');

    return gulp.src(['client/**/*.html', '!client/bower_components/**'])
      .pipe(cdnizer([{
        file: '**/bootstrap.css',
        cdn: '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'
      }, {
        file: '**/bootstrap.js',
        cdn: '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'
      }]))
      .pipe(usemin({
        css: [minifyCss(), 'concat'],
        html: [minifyHtml({
          empty: true,
          cdata: true,
          comments: true,
          conditionals: true,
          spare: true,
          quotes: true
        })],
        js: [uglify(), rev()],
        js_app: [ngmin(), uglify(), rev()]
      }))
      .pipe(gulp.dest('build/client'));
  });

  gulp.task('build:server', ['build:clean'], function() {
    return gulp.src(['server/**/*'])
      .pipe(gulp.dest('build/server'));
  });

  gulp.task('build', ['build:clean', 'build:client', 'build:server'], function() {
    return gulp.src(['server.js', 'package.json'])
      .pipe(gulp.dest('build'));
  });
};