const express = require('express');
const proxy = require('http-proxy-middleware')

const app = express();

const  apiProxy = proxy.createProxyMiddleware({target:'https://news.ycombinator.com/', secure:false}); app.use(apiProxy);

module.exports = app;
