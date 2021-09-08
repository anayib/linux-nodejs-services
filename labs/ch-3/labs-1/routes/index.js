const { Router } = require("express");
const router = Router();
const data = require("../data");

console.log(data);

router.get("/", async (req, res) => {
  let dataRes = await data();
  res.send(dataRes);
  return;
});

module.exports = router;
