const express = require('express');
const routes = require('./routes/index');
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/data', routes);

app.listen(PORT, () => { console.log(`listening at ${PORT}`)});
