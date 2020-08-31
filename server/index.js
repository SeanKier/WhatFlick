const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/v2', createProxyMiddleware({ target: 'http://newsapi.org', changeOrigin: true }));

app.use(express.static('./client/dist'));

app.get('*', (request, response) => {
  response.redirect('./');
});

app.listen(port, () => console.log(`listening on port ${port}!`));
