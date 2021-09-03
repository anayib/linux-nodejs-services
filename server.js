'use strict'
const http = require('http')
const url = require('url')
const PORT = process.env.PORT || 3000
const { STATUS_CODES } = http

const hello = `<html>
  <head>
    <style>
      body { backgorund: #333; margin: 1.25rem }
      h1 { color: #EEE; font-family: sans-serif }
    </style>
    <body>
      <h1>Hello World</h1>
    </body>
  </head>
</html>`

const root = `<html>
  <head>
    <style>
     body { background: #333; margin: 1.25rem }
     a { color: yellow; font-size: 2rem; font-family: sans-serif }
    </style>
  </head>
  <body>
    <a href='/hello'>Hello</a>
  </body>
</html>
`

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.end(STATUS_CODES[res.statusCode] + '\r\n')
    return
  }
  const { pathname } = url.parse(req.url)
  if (pathname === '/') {
    res.end(root)
    return
  }
  if (pathname === '/hello') {
    res.end(hello)
    return
  }
  res.statusCode = 404
  res.end(STATUS_CODES[res.statusCode] + '\r\n')
})


server.listen(PORT);

/*

test the server making requests
curl -X POST localhost:3000 / Not Allowd
curl -X GET localhost:3000/
curl -X GET localhost:3000/hello
*/
