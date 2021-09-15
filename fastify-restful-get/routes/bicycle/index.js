'use strict'
// Promisify version implemented

const { promisify } = require("util");
const { bicycle } = require("../../model");
const readPromisify = promisify(bicycle.read)

module.exports = async function (fastify, opts) {
  const { notFound } = fastify.httpErrors;

  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;
    try {
      return await readPromisify(id)
    } catch (err) {
      if (err.messsage === 'not found') throw notFound();
      throw err
    }
  })
}
