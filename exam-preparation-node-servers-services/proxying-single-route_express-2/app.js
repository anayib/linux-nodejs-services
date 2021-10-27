const express = require('express');
const createError = require("http-errors")
const proxy = require("express-http-proxy");


const app = express();
app.use(express.json());

app.use('/', proxy('www.google.com', {
  userResDecorator: function(proxyRes, proxyResData) {
    return new Promise(function(resolve) {
    proxyResData.funkyMessage = 'oi io oo ii';
    setTimeout(function() {
        resolve(proxyResData);
    }, 200); 
  });
}
}));


app.use((err, req, res, next) => {

    if (err.message.match(404)) {
        err.status = 404;
    };

    if (err.message.match(400)) {
        err.status = 400;
    };

    res.status(err.status || 500);
    res.json({error: err.message});
    
});

module.exports = app;
