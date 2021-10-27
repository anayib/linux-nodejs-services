const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  try {
    res.status(200);
    res.send('<h1>Hola mundo from hello</h1>')
  } catch (err) {
    next(err);
  }
})

module.exports = router;
