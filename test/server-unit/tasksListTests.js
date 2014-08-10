"use strict";

require("should");
var _ = require("lodash"), 
  TaskList = require("../../server/models/taskList");  

describe("TasksList tests", function () {

  it("verify new list is empty", function () {
    var taskList = new TaskList();

    taskList.tasks.length.should.equal(0);
  });  

  it("add new item to the list", function () {
    var taskList = new TaskList(); 
    taskList.add("New Task");

    taskList.tasks.should.have.length(1);
    taskList.tasks[0].should.have.properties({ id: 1, name: "New Task", index: 0 });
  });  

  it("add second item to the list", function () {
    var taskList = new TaskList(); 
    taskList.add("New Task 1");
    taskList.add("New Task 2");

    taskList.tasks.should.have.length(2);
    taskList.tasks[1].should.have.properties({ id: 2, name: "New Task 2", index: 1 });
  });  

  it("remove first item from the list", function () {
    var taskList = new TaskList(); 
    taskList.add("Task One");
    taskList.add("Task Two");

    taskList.remove(1);

    taskList.tasks.should.have.length(1);
    taskList.tasks[0].should.have.properties({ id: 2, name: "Task Two", index: 0 });
  });  

   it("remove second item from the list", function () {
    var taskList = new TaskList(); 
    taskList.add("Task One");
    taskList.add("Task Two");
    taskList.add("Task Three");

    taskList.remove(2);

    taskList.tasks.should.have.length(2);
    taskList.tasks[0].should.have.properties({ id: 1, name: "Task One", index: 0 });
    taskList.tasks[1].should.have.properties({ id: 3, name: "Task Three", index: 1 });
  });  

  it("get a task by id", function () {
    var taskList = new TaskList(); 
    taskList.add("New Task");

    var result = taskList.getById(1);

    result.should.have.properties({ id: 1, name: "New Task", index: 0 });
  });  

  it("get a task by id", function () {
    var taskList = new TaskList(); 
    taskList.add("New Task");

    var result = taskList.getById(2);

    _.isUndefined(result).should.be.true; // jshint ignore:line
  });  
});