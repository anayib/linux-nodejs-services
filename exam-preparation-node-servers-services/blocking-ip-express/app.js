const createError = require("http-errors");
const express = require("express");

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.socket.remoteAddress === '127.0.0.1') {
    err = new Error('forbiden API')
    err.status = 403;
    next(err);
  }
  next();
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({error: err.message});
})


module.exports = app;
