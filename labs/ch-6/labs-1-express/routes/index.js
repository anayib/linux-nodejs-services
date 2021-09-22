const { Router } = require('express');
const { promisify } = require('util');
const router = Router();
const { boat } = require('../model');
const read = promisify(boat.read);
      create = promisify(boat.create);
      update = promisify(boat.update);
      del = promisify(boat.del);
      uid = boat.uid;

/*
The course recommends not to use async/await with express stating that the behaviour is unpredictable.
Thats not true.
*/
module.exports = router;

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const data =  await read(id);
    res.status(200).json(data)
  } catch (err) {
    if (err.message === "not found") res.status(404).json(err.message)
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const id = uid();
  const data  = req.body;

  try {
    await create(id, data);
    res.status(201).send({id});
  } catch (err) {
    next(err);
  }
});

router.post('/:id/update', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await update(id, data);
    res.status(204).send();
  } catch (err) {
    if (err.message === 'not found') res.status(404).json(err.message);
    next(err);
  }
}) // this should be PUT but at linux they recmend POST

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await del(id);
    res.status(201).send({});
  } catch (err) {
    if (err.message === "not found") res.status(404).json(err.message);
    next(err);
  }
});


