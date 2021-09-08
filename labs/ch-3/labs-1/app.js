const express = require('express');
const app = express();
const routes = require('./routes/index');

app.use(routes);

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    res.status(405).send("HTTP Method Not Allowed");
    return;
  }

  if (req.path !== '/')
    res.status(404).send("Not Found");
    return;
});

app.use((err, req, res) => {
  req.send(err);
})

module.exports = app;
