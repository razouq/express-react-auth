const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({
    hello: 'world',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log('server started listening on port: ', 5000));