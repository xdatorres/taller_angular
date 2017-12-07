var express = require('express')
var app = express();
var path = require('path');
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/js/*', function (req, res) {
  res.sendFile(path.join(__dirname + req.path));
})

app.get('/css/*', function (req, res) {
  res.sendFile(path.join(__dirname + req.path));
})

app.get('/img/*', function (req, res) {
  res.sendFile(path.join(__dirname + req.path));
})

app.get('/bower_components/*', function (req, res) {
  res.sendFile(path.join(__dirname + req.path));
})
 
app.get('/views/*', function (req, res) {
  res.sendFile(path.join(__dirname + req.path));
})

app.listen(3000)