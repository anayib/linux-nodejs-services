const { Router } = require('express');
const router = Router();
const data = require('../stream');
const { finished } = require('stream');

router.get('/', (req, res, next) => {
  const streamOfData = data();
  // stream has to be initialized inside the callback function
  streamOfData.pipe(res, {end: false})

  finished(streamOfData, (err) => {
    if (err) {
      next(err);
      return;
    } else {
      res.end();
    }
  });

});

module.exports = router;
