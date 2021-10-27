const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const nodemon = require("nodemon");
const routes = require("./routes/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("tiny"));

app.use(routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({error: err.message});
});

module.exports = app;
