'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

const pointOfView = require('point-of-view')
// Plugin to manage view rendering:
const handlebars = require('handlebars')
// template engine
//
module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(pointOfView, {
    engine: { handlebars }, // {handlebards: handlebars }
    root: path.join(__dirname, 'views'), // check views at views folder
    layout:'layout.hbs' // point-of-view plugin renders the required view and then interpolats it into views/layout HTML
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.setNotFoundHandler((request, reply) => {
    if (request.method !== 'GET') {
      reply.status(405)
      return 'Method Not Allowed \n'
    }

    return 'Not Found \n'
  })
}
