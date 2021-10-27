const { Router } = require("express");
const router = Router();
const got = require("got");

router.get('/', (req, res, next) => {
  const { url } = req.query;
  console.log(new URL(url));
  got(`${url}`)
    .then((result) => {
      console.log(result.body);
      res.status(200).send(result.body);
    })
    .catch(next);
});

module.exports = router;
