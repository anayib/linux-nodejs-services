# linux-nodejs-services
NodeJS services course examples

# Creating basic web servers

## HTTP Server with Express
- `yarn init -y`
- `yarn add express http-errors`
- Update the package.json file adding scripts to make `yarn start` work running `node ./bin/www` or the file with the server.
- Create app.js file. Crate the app as an express instance, export the app as a module. Set general http errors middlewares.
- Create './routes/' folder and a file for each entity endpoints and an `./routes/index.js` file.
  - For each route file initialize an instance of Express.Router(), add to the instance the routes needed.
  - Export each instance of the router as a module.
- Import instances of router to `app.js` and create a middleware `app.use(entityRouter)` per router exported from `./routes`.
- Set node as the execution environment in './bin/www' -> `#!/usr/bin/env node`;
  - Import the app module and the Node http core module.
  - Create the PORT variable `const PORT = process.env.PORT || 3000`
  - Create an http server passing app as an argument `const server = http.createServer(app)`
  - Listen to the server `server.listen(PORT)`
- Star the server `yarn start`
- Make requests to the server to validate the implementatio.

## Fastify Web Server

- `npm init fastify` // initializes the project with the basic structure
- `npm run dev` // run the sever
- Update `routes/root.js` file to update the content that deliver the `root.js` route.
- Create any other route.
- Set `fastify.setNotFoundHandler((request, reply) => {})` function to handle errors.

Fastify is a NodeJS framework that allows to create services using RESTful arquitecture and also you can serve HTML.

Its arquitecture is not based on middlewares, like Express, but on plugins.

A plugin is a function that accepts a server instance as its first argument and an options object as a second. The plugin returns either a promise or a next() callback function.

`async function (fastify, opts) {}`

Routes in fastify are also plugins. And Plugins are also plugins. In any case, Plugins are like libraries that export specific functionalities.

Express middlewares are executed for every request but Fastify Plugins are called only at initialization time (they are also asynchronous).

When a route is define in a subfolder, the path to the route will be prefixed with the name of the subfolder. For instance: `routes/posts/index.js` all routs in index js will be prefixed with `/posts/`.

## Lab 1 Implement a simple web sever: Deliver data from data.js

Given a `data.js`, `package.json`, and `validate.js` files, create an HTTP server with any web framework that:

* Listens to localhost
* Listens on port 3000
* Responds to HTTP GET request to / with **data** function from `data.js`.
* Responds with 404 to GET requests to any other route.

Run the following command to check weather the created server meets the criteria:
`node validate`


## Lab 2: Implement a Status code response

Given the `package.json` and `validate.js` files, using any Node core library and/or web framework create an HTTP server that meets the following criteria:

* Listens on localhost
* Listens on port 3000
* Responds to HTTP GET requests to `/`with a 200 OK HTTP status, the content is irrelevant
* Responds to HTTP POST requests to `/` with a 405 Method Not Allowed HTTP status.

The `package.json` `start` script must contain a command to start the server.
`/home/nayib/Documents/programming_learning_local/linux_foundation/linux-nodejs-services/labs/ch-3/labs-2`


# Serving Web Content

Static web content should be served via a CDN or a caching reverse proxy specialized in static content such as NGINX or Varnish. Node JS can serve static content but it is not ideal for this but to serve dynamic content.

Learning objectives:

* Learn how to serve static content with Express and Fastify
* Learn to serve dynamic content with Express and Fastify
* Learn to stream content with Express and Fastify.

To serve static and dynamic content from Express and Fastify you must:

- Configure from which folder in the app are you going to load the views.
- Configure waht view engine are you going to use (ejs, handlebar, pug, etc ...)
- Configure from which folder are you going to serve the static content.

## Serving static content with Fastify

- `npm init fastify`
- `npm -save--dev fastify-static`
- `npm install`
- Update app.js folder to configure the root option to point to the public folder.

    ```js
      module.exports = async function (fastify, opts) {
   7   if (dev) {
   6     fastify.register(fastifyStatic, {
   5       root: path.join(__dirname, 'public')
   4     })
   3   }
   2   // This instructs fastify-static to only serve files from that folder, and not allow any files above that folder to be accessible
   ```
- Create a public directory with a `index.html` and `hello.html` files.
- If you make a request to `localhost:3000` or `localhost:3000/index.html` it will serve the `index.html` file static content.
- Make a request to `localhost:3000/hello.html`
- We can also set a route that responds to a specific request with static content so that the requests are `localhost:3000/hello` and not `localhost:3000/hello.html`. To do this you need to create a route and response from the route with `reply.sendFile(<your.html file>)` method.
- Create a routes/greetings folder
- Create a `indenx.js` file
```js
'use strict'

module.exports = async (fastify, opts) => {
  fastify.get('/', async (request, reply) => {
    return reply.sendFile('hello.html')
  })
}
```

## Serving dynamic content with Fastify

The main use of fastify is to create data services. Nevertheless you can also create view rendering server using templates.

In this example we use Handlebars as a template engine.

- `npm init fastify` Creates fastify project
- `npm install point-of-view handlebars` installs point-of-view pluggin which handles several template engines. Installs handlebars package.
- `npm install` Install all dependencies.
- Update app.js and routes as shown and explained in /fastify-web-server-dynamic

## Serving Static Content with Express

Express has built in tools to serve static content and dynamic content because it is more geared towards template rendering and static asset serving.

Express generator package help you generate the structure of a Express project that already have the configuration for template rendering and static asset serving.

- `npm install -g express-generator` installs express generator globally.

## Serving Dynamic Content with Express

- Install express generator
- Create a new project with express generator
- If you do not use express generator yo need to set up the folder from which the views are going to be load and the view engine.
- Check how the configuration to load the views from the `views` folder is done. Also check how the configuration to set the view engine is done and how to setup the directory o serve static files.
- Update the routes and views to create a server similar to the fastify one requirements.
- Run the server and check it works.

## Streaming Content with Fastify

The HTTP header Transfer-Encoding allows to transfer data in chunks so that the client does not have to wait until all the data is process from the server to start reading it.

Node Streams allow to read, process, and write data in chunks. Using streams to transfer data, allows the client to parse HTML (or any data structure) before the server has completely process it.

- `npm init fastify`
- Hacker News package to get latest news `hn-latest-stream` calling in when required returns a stream which fastify handles to deliver the content in chuncks
- Check the implementation of streaming content in fastify-streaming-content/routes/root.js
- Make a request to localhost:3000 to get the contnet in chuncks or to `curl -X GET localhost:3000?type=json&amount=10` to get it in json format.

| The highlight is that you need to return a Stream from the route callback so that it is handled as chunks when passed as an argument to the return value.


## Streaming Content with Express

IN brief, to stream content you `pipe` the readable sream to the writable `res` response stream and listen until the readable stream finished `stream.finished`. Then you end the `res` stream so that you reply the request at the same time you end reading from the readable stream.

Check an example in `routes/index.js` in `./express-streaming-content`.

# Creating RESTful JSON services

RSTFul is an architectural style to implement web services. The interchange format used in this architecture is JSON.

RSTful architecture allows to create interoperability between service-service and service-client.

[Architectural styles and design of network based software architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.html)


RESTful pretend to make the most out of the features of HTTP. IN HTTP the metadata is transfered via the headers, the data via the body, and the resulting outcome of the communication via HTTP status codes.

A REST service is stateless. It is an intermediate layer between the browser and the database. It should handle at least the CRUD operations.

Learning objectives:

* Understand how to implement and deploy a RESTful JSON service.
* Know the minimum fucntional criteria that a RESTFul JSON service should satisfy.


## Fastify RESTful JSON service implementation

* Create a fastify project `npm init fastify`
* Install the dependencies `npm install`
* Install `fastify-sensible` plugin to handle HTTP status codes and messages.
* Create a mock data file `model.js`. This file exports an instance of a function that mocks reading asynchronously from a DDBB.
* Create a `/bicycle` route `./routes/bicycle/index.js`
* Require the `model.js` file in `./routes/bicycles/indexjs` and implement a route that recieve a parameter `:id:`, reads the bicycle from the model and send the payload to the client or handle any error.

Implement the GET method handler to read bicycles form `model.js`:
* Synchronous
* Asynchronous  with callback API
* Asynchronous promesifying the `read` function.

Basic requirements for a GET route

* Respond with a valid JSON payload.
* Respond with an application/json Content-Type header.
* Respond with 200 status code when successful.
* Respond with a 404 status when a requested resource is not available. This would be when the read function in model.js responds with an error with message 'not found'.
* Respond with a 400, 404 or 405 for unsupported methods. For instance a POST to our server should respond with one of these codes, it doesn't matter which as the specification is ambiguous on these points and it can come down to implementation goals or wider policy.
* Respond with a 500 status for unknown errors.

## Express RESTful JSON service implementation

* Create a Express project
* Create tne route to handle the GET request
* Implement the middleware to handle errors in the sever filei
* Handle a 404 error if the request is to a route different to the one required.

Check labs/ch-5/labs-1

## Implemente a RESTful HTTP server with JSON

* The server should support a GET request to boat/:id
* Support a post request to /boat
* The route should accept and respond only with `application/json` content-type.
* The post request should respond with this format `{ data: {brand, colot} }`
* Successful request to a POST should respond with 201 HTTP status code.
* POST request errors should be handled with 500 HTTP status code - Sever Error Response -.
* The server should support GET/POST/DELETE routes
* run `node validate` to check the result.

Check `labs/ch-6/labs-1-fastyfy/routes/boat/index.js` - Implementation with fastify

* `npm init fastify`
* Implement endpoints based on model.js API

Check `labs/ch-6/labs-1-express/routes/boat/index.js` - Implementation with express

CHECK `labs/ch-6/labs-1-express` for express implementation
CHECK `labs/ch-6/labs-1-fastyfy` for fastify implementation

## Consuming Services

You will learn how to create services that consume other HTTP services.

Some times you need several services to communicate between them. There are many ways to implement this. One way is injecting a base URL at `process.env` or another one is injecting a port number at `process.env` using in both cases environment variables.

Find an implementation of services consuming each other  at `./consuming-services`. These are services implemented to run locally and they are not production ready. For production services use frameworks.

The consumer service is impleemnted with fastify, the providers with plain node core http module. We use fatify `got` library to make requests to the services and `fastify-sensible` to generate http errors.

### Consuming service from another one

This is an example of fetching data from a service to another `./consuming-services/consumer/routes/root.js`

### Combining a service with another one

- Making request one after the previous resolved `./consuming-services/consumer/routes/root-combine-services.js`

- Making requests concurrently with `Promise.all([])` : `./consuming-services/consumer/routes/root-combine-services-concurrently.js`

Check `./labs/ch-7/labs-1` for an additional example on data aggregating/combining service

Details of a sample implementation:
* Create a file with two simple services that deliver mock data Eg: `./labs/ch-7/labs-1/boat-service.js`.
* Initialize a fastify projects `npm init fastify`
* Import the ENV variales to set the port of the provider services.
* Update the route of the consumer service to aggregate data from the 2 provider services.
    * Install fastify-sensible - to handle errors- and got ligraries - to make requests - `npm install got fastify-sensible`.
* Update the package.json to start the service with `npm start`

# Proxying

An HTTP Proxy is a server that forward http request to backend services and then forward responses to the clients. NGINX and Kong are services to implement proxies. You can also create your own proxy services with NodeJS.

What you will learn:
- Proxy HTTP request for a single route.
- Modify data during proxying.
- Create a full proxy server
## Single route multiorigin Proxy

In this case our proxy supplies the desired endpoint using a url query string parameter. In other words, the request to our server replies with the response from the endpoint we passed as a query param.

check `./my-route-proxy`

## Single Origin, Multi-Route Proxy

Proxying any request to any route in another server
check `./http-proxy-fastify`

Labs
- Implement a HTTP Route Based Proxy `./labs/ch-8/labs-1`  .
This proxy allows to make requests to a specific route in another service. Our proxy server forwards the request and replies with the third party service response.
- Implement a full proxying service `./labs/ch-8/labs-2`
This proxy allows to forward request to any server and any of its routes and handles any response from any route to be forward to the client that made the request to our proxy.

## Security

Objectives
- Learn how to avoid parameter pollution
- Learn how to do route validation

### Errors parsing query strings
- Parsing a query string could result in a string or an array. If handled improperly it would generate an error.
eg:`?name=bob&name=dave`  | this query string would generate the following object `{name: ['bob', 'dave']}`
If you call string methods on what is supposed a string as a value of the key for `{name: 'dave'}` but you are really getting an array, you will have an error.

| Parameter pollution attack is an attack Making a request to a URL where two query-string parameters with the same name are set in hopes of exploiting a common developer error in order to crash or slow down a service

The following code will generate an error if the query string is `?name="Nayib&name="Carlos"` because the query string name/key contains an array instead of a string and there is not a `split()` Array method.

```js
router.get('/', (req, res, next) => {
  someAsynchronousOperation(() => {
    if (!req.query.name) {
      var err = new Error('Bad Request')
      err.status = 400
      next(err)
      return
    }
    var parts = req.query.name.split(' ');
    var last = parts.pop();
    var first = parts.shift();
    res.send({first: first, last: last});
  })
});
```
There is no way to catch unhandled exceptions that raise in asynchronous operations with express while you can handle them with fastify (async/away).

A way to solve it is validating the query keys types, checking if the values are strings or arrays - with Array.isArray(arr) -

```js
function convert (name) {
  var parts = name.split(' ');
  var last = parts.pop();
  var first = parts.shift();
  return {first: first, last: last};
}
router.get('/', (req, res, next) => {
  someAsynchronousOperation(() => {
    if (!req.query.name) {
      var err = new Error('Bad Request')
      err.status = 400
      next(err)
      return
    }
    if (Array.isArray(req.query.name)) {
      res.send(req.query.name.map(convert));
    } else {
      res.send(convert(req.query.name));
    }
  });
});
```
### Validating the body of the request with Fastify

When usign Fastify validate routes using the `schema` options which helps declare and validate the rules for incoming and outgoing data. It is used in JSONSchema format.

Up until now we've only seen route methods (as in, fastify.post) take two arguments: the route to serve as a string and the route handler function. A third options argument can be passed in between the route string and the route handler function. [See](https://www.fastify.io/docs/latest/Routes/#options) for a full list of options

The schema option supports body, query, params, headers and response as schemas that can be declared for these areas of input (or output in the case of response)

The `schema` is an object of options passed to the http verbs methods as a second parameter, after the route pattern, so that you validate the incoming data type/structure.

For a post route as follows:
```js
  fastify.post('/', async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })
```
You could use `schema` for the incoming data validation as follows given the fact that we have a `request.body` that should return an object in the following form `{ data: { brand, color } }`:
```js
 fastify.post('/', {
   schema: {
      body: {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
          data: {
            type: 'object',
            required: ['brand', 'color'],
            additionalProperties: false,
            properties: {
              brand: {type: 'string'},
              color: {type: 'string'}
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })
```

One of the route options is the schema which is an object containing the schemas for the request and response. They need to be in JSON Schema format, [check here](https://www.fastify.io/docs/latest/Validation-and-Serialization/)

We can **reuse a schema validator** saving setting a schema to a variable an referencing it as an option in other routes. Check the `POST` and `PUT` routes:

```js
// app.js
'use strict'
const { promisify } = require('util')
const { bicycle } = require('../../model')
const { uid } = bicycle
const read = promisify(bicycle.read)
const create = promisify(bicycle.create)
const update = promisify(bicycle.update)
const del = promisify(bicycle.del)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  const bodySchema = {
    type: 'object',
    required: ['data'],
    additionalProperties: false,
    properties: {
      data: {
        type: 'object',
        required: ['brand', 'color'],
        additionalProperties: false,
        properties: {
          brand: {type: 'string'},
          color: {type: 'string'}
        }
      }
    }
  }

  fastify.post('/', {
    schema: {
      body: bodySchema
    }
  }, async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })

  fastify.post('/:id/update', {
    schema: {
      body: bodySchema
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await update(id, data)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.put('/:id', {
    schema: {
      body: bodySchema
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await create(id, data)
      reply.code(201)
      return { }
    } catch (err) {
      if (err.message === 'resource exists') {
        await update(id, data)
        reply.code(204)
      } else {
        throw err
      }
    }
  })

 ```

### Validating the request params with fastify

 We can apply **validation to route parameters** with the `schema.params` option. Lets say a route accepts a param - that has to be an integer - for the `GET` `POST/PUT` and `DELETE` routes:

 ```js
const paramsSchema = {
    id: {
      type: 'integer'
    }
  }
 ```

 ```js
 // app.js

 'use strict'
const { promisify } = require('util')
const { bicycle } = require('../../model')
const { uid } = bicycle
const read = promisify(bicycle.read)
const create = promisify(bicycle.create)
const update = promisify(bicycle.update)
const del = promisify(bicycle.del)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  const bodySchema = {
    type: 'object',
    required: ['data'],
    additionalProperties: false,
    properties: {
      data: {
        type: 'object',
        required: ['brand', 'color'],
        additionalProperties: false,
        properties: {
          brand: {type: 'string'},
          color: {type: 'string'}
        }
      }
    }
  }

  const paramsSchema = {
    id: {
      type: 'integer'
    }
  }

  fastify.post('/', {
    schema: {
      body: bodySchema
    }
  }, async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })

  fastify.post('/:id/update', {
    schema: {
      body: bodySchema,
      params: paramsSchema
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await update(id, data)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.get('/:id', {
    schema: {
      params: paramsSchema
    }
  }, async (request, reply) => {
    const { id } = request.params
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.put('/:id', {
    schema: {
      body: bodySchema,
      params: paramsSchema

    }
  }, async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await create(id, data)
      reply.code(201)
      return { }
    } catch (err) {
      if (err.message === 'resource exists') {
        await update(id, data)
        reply.code(204)
      } else {
        throw err
      }
    }
  })

  fastify.delete('/:id', {
    schema: {
      params: paramsSchema
    }
  }, async (request, reply) => {
    const { id } = request.params
    try {
      await del(id)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })
}
```

### Validating the response with Fastify

We validate the response by passing options to the `schema.response` object.

For the `POST` route we respond with an `id` and for the `GET` route we do with an `object` that should include specific properties. We could validate this by checking the data type of the response in each route. Eg:

Response validation for the `POST` route - check the `schema.response.201` object:

```js
// previous code not included

const idSchema = { type: 'integer' }
const paramsSchema = { id: idSchema }

 fastify.post('/', {
    schema: {
      body: bodySchema,
      response: {
        201: {
          id: idSchema
        }
      }
    }
  }, async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
 });

```

Response validation for the `GET` route - check the `shcema.response.200` object.

```js
// previous code not included

 const dataSchema = {
    type: 'object',
    required: ['brand', 'color'],
    additionalProperties: false,
    properties: {
      brand: {type: 'string'},
      color: {type: 'string'}
    }
  }


fastify.get('/:id', {
    schema: {
      params: paramsSchema,
      response: {
        200: dataSchema
      }
    }
  }, async (request, reply) => {
    const { id } = request.params
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

```

Final example file with request and response routes validations

```js
// app.js

'use strict'
const { promisify } = require('util')
const { bicycle } = require('../../model')
const { uid } = bicycle
const read = promisify(bicycle.read)
const create = promisify(bicycle.create)
const update = promisify(bicycle.update)
const del = promisify(bicycle.del)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  const dataSchema = {
    type: 'object',
    required: ['brand', 'color'],
    additionalProperties: false,
    properties: {
      brand: {type: 'string'},
      color: {type: 'string'}
    }
  }

  const bodySchema = {
    type: 'object',
    required: ['data'],
    additionalProperties: false,
    properties: {
      data: dataSchema
    }
  }

  const idSchema = { type: 'integer' }
  const paramsSchema = { id: idSchema }

  fastify.post('/', {
    schema: {
      body: bodySchema,
      response: {
        201: {
          id: idSchema
        }
      }
    }
  }, async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })

  fastify.post('/:id/update', {
    schema: {
      body: bodySchema,
      params: paramsSchema
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await update(id, data)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.get('/:id', {
    schema: {
      params: paramsSchema,
      response: {
        200: dataSchema
      }
    }
  }, async (request, reply) => {
    const { id } = request.params
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.put('/:id', {
    schema: {
      body: bodySchema,
      params: paramsSchema
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await create(id, data)
      reply.code(201)
      return { }
    } catch (err) {
      if (err.message === 'resource exists') {
        await update(id, data)
        reply.code(204)
      } else {
        throw err
      }
    }
  })

  fastify.delete('/:id', {
    schema: {
      params: paramsSchema
    }
  }, async (request, reply) => {
    const { id } = request.params
    try {
      await del(id)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })
}
```

While invalidation of input-related schemas (such as schema.body) will result in a 400 Bad Request, the invalidation of a response schema will result in a 500 Server Error result.


### Security labs

1. Implement a Service That Is Not Vulnerable to Parameter Pollution
2. Validate a POST Request
3. Validate a GET Response

Check [url pollution and route validation labs](./labs/ch-9/); at `labs/ch-9/labs-2`.

# Learn how to block an attacker's IP address

## Blocking an IP address with Fastify


## Blocking an IP address with Express

### Blocking IP address labs

1. Block an attacker's IP address with express.
2. Block an attacker's IP address with fastify.

