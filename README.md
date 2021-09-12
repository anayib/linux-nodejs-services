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
