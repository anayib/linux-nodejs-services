const express = require("express");
const createHttpError = require("http-errors");
const indexRouter = require('./routes/index');
const helloRouter = require('./routes/hello');

const app = express();

app.use(indexRouter);
app.use('/hello', helloRouter);

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    next(createHttpError(405));
    return;
  } else if (req.path !== "/" || req.path !== "/hello") {
    next(createHttpError(404));
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});


module.exports = app;
