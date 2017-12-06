var express = require('express')
var app = express();
var path = require('path');
 
app.get('/pagina_bonita', function (req, res) {
  //res.send('<h1>Hello World</h1>');
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/js/*', function (req, res) {
  res.sendFile(path.join(__dirname + req.path));
})
 
app.listen(3000)