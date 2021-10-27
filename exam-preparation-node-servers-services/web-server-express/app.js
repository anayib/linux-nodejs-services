const express = require("express");
const app = express();
const data = require('./data');
const createError = require('http-errors');
const helloRoutes = require('./routes/index');

app.use('/hello', helloRoutes);

app.get('/', async (req, res, next) => {
  try {
    const mydata = await data();
    res.status(201);
    res.send(mydata);
  } catch(err) {
    console.log(`catch`, err.message)
    next(createError(404));
  }
});

app.use((req, res, next) => {
  if( req.method !== "GET") {
    next(createError(405));
    return
  } else if (req.path !== "/") {
    next(createError(404));
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err.message)
  res.send(err.message || 'Route not allowed');
})

// error handler middleware
// export app

module.exports = app;
