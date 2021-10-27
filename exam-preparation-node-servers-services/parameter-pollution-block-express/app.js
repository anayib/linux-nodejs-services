const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("tiny"))


app.get("/", (req, res, next) => {
  const { id } = req.query;
  console.log( id) 
  
  if ( !Object.prototype.hasOwnProperty.call(req.query, "id")) {
      next(createError(400));
      return;
  } 
  
  if (Array.isArray(id)) {
    setTimeout(() => {
      const result =  id.map( word => {
            return word.toString().toUpperCase();
      });
      
      res.status(200).send(result);
      
    }, 1000);
    return;
  }
  
  setTimeout( () => {
    res.status(200).send(id.toString().toUpperCase());
  }, 1000)
})

app.use((err, req, res, next) => {
  if (err.message.match(400)) err.status = 400;
  if (err.message.match(404)) err.status = 404;
  if (err.message.match(403)) err.status = 403;

  res.status(err.status || 500);
  res.json({error: err.message});
})

module.exports = app;
