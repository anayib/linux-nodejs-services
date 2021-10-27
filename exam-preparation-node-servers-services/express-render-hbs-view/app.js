const express = require("express");
const path = require('path');
const app = express();
const meRoutes = require('./routes/me');

app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/me', meRoutes);

app.use((err, req, res, next) => {
  res.status( err.status || 500);
  res.send(err.message);
})



module.exports = app;
