const { Router } = require("express");
const { promisify } = require('util');
const router = Router();
const { boat } = require("../model");
const boatRead = promisify(boat.read);


module.exports = router;

router.get('/:id', async (req, res, next) => {

  try {
    const { id } = req.params
    const payload = await boatRead(id)
    res.status(200).json(payload)
  } catch (err) {
    if (err.message === "not found") next();
    next(err);
  }
});
