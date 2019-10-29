const express = require('express');
const app = express();
const port = 5000;


app.listen(port, () => console.log(`listening on port ${port}!`));

app.use(express.static('./client/dist'));