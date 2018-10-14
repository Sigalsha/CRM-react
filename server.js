var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./server/routes/api.js')
const app = express();
const SERVER_PORT = (8100);

mongoose.connect('mongodb://localhost/clientsDB', function() {
  console.log("DB connection established!!!");
})

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  
    next()
})


app.use('/', api);

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
