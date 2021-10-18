'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

router.get('/', (req, res) => {
  let validQueryString = req.query.un;
  let upperCasedStrings;

  if (Array.isArray(validQueryString)) {
    upperCasedStrings = validQueryString.map( word => word.toUpperCase());
    setTimeout(() => {
      res.send(upperCasedStrings || '');
    }, 1000)
  } else {
    setTimeout(() => {
      res.send((req.query.un ||'').toUpperCase());
    }, 1000);
  }
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})



/*
Validate if req.query is an array or an object
if it is an object, continue
if it is an array
  get each value to create a new string and pass it to the response
*/
