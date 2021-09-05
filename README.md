# linux-nodejs-services
NodeJS services course examples

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
