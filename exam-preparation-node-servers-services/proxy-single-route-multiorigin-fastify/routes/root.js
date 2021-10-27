'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { fetch } = request.query
    
    try {
      new URL(fetch)
    } catch (err) {
      throw fastify.httpErrors.badRequest()
    }
    
    return reply.from(fetch,  {
      onResponse: (request, reply, res) => {
        reply.removeHeader('content-length');
        reply.send(res);
      }
    })
  })
}