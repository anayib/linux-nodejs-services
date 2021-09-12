'use strict'

module.exports = async (fastify, opts) => {
  fastify.get('/', async (request, reply) => {
    const { greeting = 'hello' } = request.query
    // if not query param greeting set greeting to 'Hello'
    return reply.view(`hello.hbs`, { greeting })
  })
}
/*
The view() method can take a second parameter which is an object with the local variables we want to be available in a specific tempalte.
*/
