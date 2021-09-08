const { Router } = require('express');
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({message: "God Get Request"})
});

module.exports = router;
