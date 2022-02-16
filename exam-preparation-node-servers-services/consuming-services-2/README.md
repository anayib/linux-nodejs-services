Example of a service - `consumer-service` that consumes two other services.

The `npm_start_script` is a shell script to start the 3 servers with one command.

After adding this to the `package.json` to start the 3 services  with one command  `"start-all": "sh npm_start_script"` you can run from the terminal:

`npm run start-all` and the 3 node services (processes) will start.
