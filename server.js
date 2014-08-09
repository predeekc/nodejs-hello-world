"use strict";

var express = require("express"),
  logger = require("./server/logger");

var app = express();

app.use(express.static("client"));
app.get('/api', function(req, res){
  res.send('hello world');
});

var port = 9000; 
app.listen(port, function () {
  logger.info('Express server listening on port %d in %s mode', port, app.get('env'));
});
