'use strict'
const got = require('got');

const {
  BICYCLE_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5000
} = process.env;

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify;

  fastify.get('/combining/:id', async function (request, reply) {
    const { id } = request.params;
    try {
      const bicycle = await got(`${bicycleSrv}/${id}`).json();
      const brand = await got(`${brandSrv}/${id}`).json();
      return {
        id: bicycle.id,
        color: bicycle.color,
        brand: brand.name,
      }
    } catch (err) {
      if (!err.response) throw err;
      if (err.response.statusCode === 404) {
        throw httpErrors.notFound()
      }
      if (err.response.statusCode === 400) {
        throw httpErrors.badRequest();
      }
      throw err;
    }
  });
}
