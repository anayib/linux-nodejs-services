'use strict'
const got = require('got');
const {
  BOAT_SERVICE_PORT,
  BRAND_SERVICE_PORT
} = process.env;

const boatService = `http://localhost:${process.env.BOAT_SERVICE_PORT}`;
const brandService = `http://localhost:${process.env.BRAND_SERVICE_PORT}`;

module.exports = async function (fastify, opts) {
  const { httpErrors } = fastify;

  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;

    try {
      const boat = await got(`${boatService}/${id}`);
      console.log('/////////////////', boat.brand)
      const brand = await got(`${brandService}/${boat.brand}`);
      console.log('////////////BRAND//////////', brand)
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
