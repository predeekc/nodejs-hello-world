"use strict";

var _ = require("lodash"),
  _taskList;

function TaskList() {
  this.tasks = [];
}

TaskList.prototype.add = function (name) {
  var maxId = _.max(this.tasks, 'id');
  if (maxId === -Infinity) {
    maxId = { id: 0 };
  }
  var newTask = { 
    id: maxId.id + 1,
    index: this.tasks.length, 
    name: name 
  };
  this.tasks.push(newTask);

  return newTask; 
};

TaskList.prototype.remove = function (id) {
  _.remove(this.tasks, { id: id });

  _.forEach(this.tasks, function (task, index) {
    task.index = index;
  });
};

TaskList.prototype.getById = function (id) {
  var result = _.find(this.tasks, { 'id': id });
  return result;
};

TaskList.get = function () {  
  if (!_taskList) {    
    _taskList = new TaskList();
    _taskList.add("Task One");
    _taskList.add("Task Two");
    _taskList.add("Task Three");
  }

  var result = new TaskList();
  result.tasks = _.cloneDeep(_taskList.tasks);
  return result;
};

TaskList.update = function (taskList) {  
  if (!taskList) {
    _taskList = undefined;    
  } else {
    _taskList.tasks = _.cloneDeep(taskList.tasks);
  }  
};

module.exports = TaskList;