"use strict";

// must be here for the sublime plugin to load the tasks
var gulp = require('gulp'); // jshint ignore:line

var options = {
  sourcePaths: [ "server/**/*.js", "server.js" ],
  startScriptPath: "server.js",
  testPaths: [ "test/**/*Tests.js" ]
};

require("./gulp/debugging")(options);
require("./gulp/testing")(options);

