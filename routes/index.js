var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

router.get('/api/todos', function(request, response) {
  Todo.find(function(err, todos) {
    if (err) {
      response.send(err);
    }
    response.json(todos);
  });
});

//create todo and send back all todos after creation
router.post('/api/todos', function(request, response) {
  Todo.create({
    text: request.body.text,
    done: false
  }, function(err, todo) {
    if (err) {
      response.send(err);
    }
    Todo.find(function(err, todos) {
      if (err) {
        response.send(err);
      }
      response.json(todos);
    });
  });
});

router.delete('/api/todos/:id', function(request, response) {
  Todo.remove({
    _id: request.params.id
  }, function(err, todo) {
    if (err) {
      response.send(err);
    }
    Todo.find(function(err, todos) {
      if (err) {
        response.send(err);
      }
      response.json(todos);
    });
  });
});

module.exports =  router;
