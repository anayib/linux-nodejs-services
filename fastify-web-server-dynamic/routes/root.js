'use strict'

module.exports = async (fastify, opts) => {
  fastify.get('/', async (request, reply) => {
    return reply.view('index.hbs')// the view method implements all the logig so taht renders the index.hbs first and then intepolates its HTML into views/layout.hbs and send the combined HTML as a response
  })
}
