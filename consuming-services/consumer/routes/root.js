'use strict'
const got = require('got');

const {
  BICYCLE_SERVICE_PORT = 4000
} = process.env;

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;

module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify;

  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;
    try {
      const bicycle = await got(`${bicycleSrv}/${id}`).json();
      return bicycle
    } catch (err) {
      if (!err.response) throw err;
      if (err.response.statusCode === 404) {
        throw httpErrors.notFound()
      }
      if (err.response.statusCode === 400) {
        throw httpErrors.badRequest();
      }
      throw err
    }
  })
}
