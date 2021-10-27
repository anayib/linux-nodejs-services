'use strict'
const { promisify } = require('util');
const { Router } = require('express');
const router = Router();
const { bicycle } = require('../model');
const create = promisify(bicycle.create);
const read = promisify(bicycle.read);
const update = promisify(bicycle.update);
const del = promisify(bicycle.del);
const uid = bicycle.uid;

// Dont use try/catch with async await because try/catch in express only handles synchronous code https://expressjs.com/en/advanced/best-practice-performance.html#use-try-catch

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  read(id)
    .then((result) => res.status(200).json(result))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const id = uid();
  const { data } = req.body;

  create(id, data)
    .then((result) => res.status(201).json({id}))
    .catch(next);
});

/*
The wrap() function is a wrapper that catches rejected promises and calls next() with the error as the first argument.
https://expressjs.com/en/advanced/best-practice-performance.html#use-promises
const wrap = fn => (...args) => fn(...args).catch(args[2]);
router.post('/', wrap(async (req, res, next) => {
  const id = uid();
  const { data } = req.body;

  const result = await create(id, data);
  res.status(201).json(result);
}));
*/
router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  const data = req.body.data;

  update(id, data)
    .then((result) => res.status(204).json())
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  del(id)
    .then((result) => res.status(204).json())
    .catch((next) => console.log(next));
});

module.exports = router;

