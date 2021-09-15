const express = require("express");
const boatRoutes = require("./routes/index");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use("/boat", boatRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message)
});

app.listen(PORT, () => {console.log(`listening at ${PORT}`)});
