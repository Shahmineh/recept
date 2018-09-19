
const path = require('path');
const absolutePathHere = __dirname;

require('all-that-sass')({
  watch:  path.join(absolutePathHere,'./sass'),
  input:  path.join(absolutePathHere,'./sass/style.scss'),
  output: path.join(absolutePathHere,'./www/style/css/style.css'),
  reportErrors: true,
  reportCompiles: true,
  outputStyle: 'expanded'
});

const express = require('express');
const flexjson = require('jsonflex')();
const compression = require('compression');

// Create a new web server
const app = express();
// Tell the web server to serve files
// from the www folder
app.use(compression());
app.use(flexjson);
app.use(express.static('www'));

app.get(/^[^\.]*$/, (req, res) => {
  res.sendFile(__dirname + '/www/index.html');
});

// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));