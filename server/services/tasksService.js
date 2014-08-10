"use strict";

module.exports = require("express").Router()
  .use(require("body-parser").json())
  .use(lookupTaskList)
  .param("taskId", lookupTaskById)
  .get("/tasks", getAllTasks)
  .put("/tasks/:taskId", updateTask)
  .post("/tasks", createTask);

var TaskList = require("../models/taskList");

function lookupTaskList(req, res, next) {    
  req.taskList = TaskList.get();    
  next();
}

function lookupTaskById(req, res, next, taskId) {
  taskId = parseInt(taskId);  
  req.task = req.taskList.getById(taskId);
  
  if (!req.task) {
    return req.send(404);
  }

  next();
}

function getAllTasks(req, res) {
  res.send(req.taskList.tasks);
}

function updateTask(req, res) {  
  req.task.name = req.body.name;
  TaskList.update(req.taskList);
  res.send(req.task);
}

function createTask(req, res) {
  var newTask = req.taskList.add(req.body.name);

  TaskList.update(req.taskList);

  res.send(newTask);
}