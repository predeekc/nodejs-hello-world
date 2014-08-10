"use strict";

var app = require("./server/website"),
  logger = require("./server/logger");
 
var port = 9000; 
app.listen(port, function () {
  logger.info('Express server listening on port %d in %s mode', port, app.get('env'));
});
