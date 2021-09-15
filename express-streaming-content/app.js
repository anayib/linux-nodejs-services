const express = require('express');
const PORT = process.env.PORT || 3000;
const articleRoutes = require('./routes/articles');

const app = express();

app.use(express.json());
app.use(articleRoutes);

app.use((err, req, res) => {
  if (err) {
    res.status(err.status || 500);
    res.send(err.message);
  }
});

app.listen(PORT, () =>  { console.log(`listening at ${PORT}`)})
