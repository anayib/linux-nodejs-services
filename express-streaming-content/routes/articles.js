const { Router } = require('express');
const router = Router();
const hnLatestStream = require('hn-latest-stream');
const { finished } = require('stream');

router.get('/', (req, res, next) => {
  const { amount = 10, type = "html" } = req.query;

  if (type === "html") res.type("text/html");
  if (type === "json") res.type("applciation/json");

  const stream = hnLatestStream(amount, type);
  //creates the stream
  stream.pipe(res, { end: false });
  /* pipes the content of the stream into the res object
  which is another stream.
  The option { end: false } prevents the program not to stop once the stream is finished, because we need ot handle any err frm the source stream.
  */

  finished(stream, (err) => {
    if (err)  {
      next(err);
      return;
    }

    res.end()
  })

})

module.exports = router;
