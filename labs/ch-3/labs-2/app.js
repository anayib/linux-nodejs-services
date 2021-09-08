const express = require('express');
const routes = require('./routes/index');

const app = express();

app.use(routes);

app.use((req, res) => {
  if (req.method !== 'GET') {
    res.status(405);
    res.send('Method not Allowed');
    return;
  }

  res.status(404);
  res.send("Not Found");
  return;
})

app.use((err, req, res) => {
  res.send(err.message);
});

module.exports = app;
