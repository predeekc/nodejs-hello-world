(function() {
  "use strict";

  angular.module("helloWorldApp")
    .factory('Tasks', createTaskService);

  function createTaskService($resource) {
    return $resource("api/tasks/:id", null, {
      'update': {
        method: 'PUT'
      }
    });
  }
  createTaskService.$inject = ["$resource"];
}());