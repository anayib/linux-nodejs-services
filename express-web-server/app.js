'use strict'

const express = require('express');
const createError = require('http-errors');
const indexRoutes = require('./routes');
const helloRoutes = require('./routes/hello');

const app = express();

// app.use() is a method of Express instances that allows to call functions in every request
// It receives 3 parameters req, res, next. When calling next the following middleware function app.use(callBack)
// is executed.

app.use('/', indexRoutes);
app.use('/hello', helloRoutes);

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    next(createError())
    return;
  }
  next(createError(404))
});

// the last middleware should receive 4 parammeters using an err first approach
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.mesage);
});

module.exports = app;

// instanciates an express instance an exports it w/ module
