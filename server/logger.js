"use strict";

var winston = require("winston"),
  env = process.env.NODE_ENV;

var level;
if (env === 'development') {
  level = 'verbose';
}

var consoleTransport = new winston.transports.Console({ level: level });

var logger = new winston.Logger({
  transports: [ consoleTransport ]
});

module.exports = logger;