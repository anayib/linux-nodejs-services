'use strict'
const got = require('got');

const boatService = `http://localhost:${process.env.BOAT_SERVICE_PORT}`;
const brandService = `http://localhost:${process.env.BRAND_SERVICE_PORT}`;

module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify;

  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;

    try {
      const [ boat, brand ] = await Promise.all([
        got(`${boatService}/${id}`).json(),
        got(`${brandService}/${id}`).json()
      ]);
      return ({
        id: boat.id,
        color: boat.color,
        brand: brand.name,
      })
    } catch (err) {
      if (!err.response) throw err
      if (err.statusCode === 404)  {
        throw httpErrors.notFound();
      }
      throw err;
    }
  })
}
