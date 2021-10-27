const express = require('express');
const createError = require('http-errors');
const bicycleRoutes = require('./routes/bicicle');

const app = express();

app.use(express.json());
app.use('/bicycle', bicycleRoutes);

app.use((err, req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({error: err.message});
});


module.exports = app;
