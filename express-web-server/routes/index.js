'use strict'
const { Router } = require('express');
const router = Router();
// instance of Express Router, which is a function that supports any HTTP verb. Each verb is handled by a fucntion assign to the router instance as a property with the same name of the HTTP verbs. Each function receives a first argument which isa string representing the path - end point - and the second is a middleware fucntion executed if the endpoint exists

const root = `<html>
  <head>
    <style>
      body { background: #333; margin:1.25rem }
      a { color: ywllow; font-size: 2rem; font-family: sans-serif }
    </style>
  </head>>
  <body>
    <a href="/hello">Hello</a>
  </body>
</html>>`

// inlining HTML like this is just for demostration purpose and is uncommon.

router.get('/', (req, res) => {
  res.send(root);
});

module.exports = router;
