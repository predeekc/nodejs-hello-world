"use strict";

require("should");
var app = require("../../server/website");

var TasksList = require("../../server/models/taskList"),
  request = require('supertest');

describe("TasksService tests", function () {

  beforeEach(function () {
    TasksList.update(); // undefined call resets the data store
  });

  it("get all tasks", function (done) {
    request(app)
      .get('/api/tasks')
      .expect('Content-Type', /json/)      
      .expect(200, [
        { id: 1, name: "Task One", index: 0 },
        { id: 2, name: "Task Two", index: 1 },
        { id: 3, name: "Task Three", index: 2 }
      ])
      .end(done);
  });

  it("add a new task", function (done) {
    request(app)
      .post('/api/tasks')
      .send({ name: 'New Task' })
      .expect('Content-Type', /json/)      
      .expect(200, { id: 4, name: "New Task", index: 3 })    
      .end(function () {
        request(app)
          .get('/api/tasks')
          .expect('Content-Type', /json/)      
          .expect(200, [
            { id: 1, name: "Task One", index: 0 },
            { id: 2, name: "Task Two", index: 1 },
            { id: 3, name: "Task Three", index: 2 },
            { id: 4, name: "New Task", index: 3 }
          ])
          .end(done);
      });  
  });

  it("update a task", function (done) {
    request(app)
      .put('/api/tasks/2')
      .send({ name: 'Updated Task' })
      .expect('Content-Type', /json/)      
      .expect(200, { id: 2, name: "Updated Task", index: 1 })    
      .end(function () {
        request(app)
          .get('/api/tasks')
          .expect('Content-Type', /json/)      
          .expect(200, [
            { id: 1, name: "Task One", index: 0 },
            { id: 2, name: "Updated Task", index: 1 },
            { id: 3, name: "Task Three", index: 2 }
          ])
          .end(done);
      });  
  });


});