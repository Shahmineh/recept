// Require the express module
const express = require('express');
// Create a new web server
const app = express();
// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));
// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));

const mongoose = require('mongoose');

/* mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/receptonaring", {
  useNewUrlParser: true
});

let User = mongoose.model('User', {
  email: String,
  password: String
});

let user = new User({
  email: "dennisek85@gmail.com",
  password: 'test'
});

user.save().then((x)=>{
    console.log('saved')
  }, (e)=>{
    console.log(e);
  }
) */