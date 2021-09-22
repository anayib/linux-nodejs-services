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
