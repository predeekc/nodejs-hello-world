"use strict";

var express = require("express");

var app = express();

app.use("/api", require("./services/tasksService"));
app.use(express.static("client"));

module.exports = app;