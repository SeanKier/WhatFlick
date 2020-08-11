const express = require('express');
const app = express();
const port = 5000;

const { createProxyMiddleware } = require('http-proxy-middleware');


app.use('/v2', createProxyMiddleware({ target: 'http://newsapi.org', changeOrigin: true }));

app.use(express.static('./client/dist'));


app.listen(port, () => console.log(`listening on port ${port}!`));
