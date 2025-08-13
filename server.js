// server.js
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.static('public')); // your portfolio folder

const options = {
  key: fs.readFileSync('ssl/server.key'),
  cert: fs.readFileSync('ssl/server.cert')
};

https.createServer(options, app).listen(3333, () => {
  console.log('HTTPS Server running on https://localhost:3333');
});
