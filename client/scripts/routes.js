(function() {
  "use strict";

  angular
    .module("helloWorldApp")
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/tasks', {
        templateUrl: 'views/tasks.html',
        controller: 'Tasks',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/tasks'
      });
  }
  config.$inject = ["$routeProvider"];
}());