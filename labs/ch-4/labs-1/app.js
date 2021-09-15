const express = require('express');
const routes = require('./routes/me');
const PORT = process.env.PORT || 3000;

const app = express();

app.set('views', './views');
// setup the folder to load views

app.set('view engine', 'hbs');
// set up the views engineapp.use();

app.use('/me', routes);

app.listen(PORT, () => { console.log(`listening at ${PORT}`)});
