const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
    if (err.message.match("404")) {
        err.status = 404    ;
    }

    if (err.message.match("400")) {
        err.status = 400
    }
    
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;