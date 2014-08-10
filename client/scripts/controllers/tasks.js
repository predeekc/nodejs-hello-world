(function() {
  'use strict';

  angular.module('helloWorldApp')
    .controller('Tasks', Controller);

  function Controller(Tasks, $modal) {
    var vm = this;

    vm.tasks = Tasks.query();

    vm.remove = function(task) {
      Tasks.delete({
        id: task.id
      });

      vm.tasks = Tasks.query();
    };

    vm.edit = function(task) {
      $modal.open({
        templateUrl: 'editTask.html',
        controller: ModalInstanceCtrl,
        resolve: {
          item: function() {
            return _.clone(task);
          }
        }
      })
        .result.then(function(result) {
          _.assign(task, result);
          Tasks.update({
            id: task.id
          }, task);
        });
    };

    vm.new = function() {
      $modal.open({
        templateUrl: 'editTask.html',
        controller: ModalInstanceCtrl,
        resolve: {
          item: function() {}
        }
      })
        .result.then(function(task) {
          Tasks.save(task, function(result) {
            vm.tasks.push(result);
          });
        });
    };
  }

  function ModalInstanceCtrl($scope, $modalInstance, item) {
    var vm = $scope;
    vm.item = item || {};

    vm.ok = function() {
      $modalInstance.close(vm.item);
    };

    vm.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }
}());