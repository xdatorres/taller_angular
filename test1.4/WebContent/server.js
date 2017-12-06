var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
	extended : false
}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/js/*', function(req, res) {
	res.sendFile(path.join(__dirname + req.path));
})

app.get('/css/*', function(req, res) {
	res.sendFile(path.join(__dirname + req.path));
})

app.get('/img/*', function(req, res) {
	res.sendFile(path.join(__dirname + req.path));
})

app.get('/views/*', function(req, res) {
	res.sendFile(path.join(__dirname + req.path));
})

app.post('/test_server', function(req, res) {
	console.log(req.body.usuario);
	res.json(req.body.usuario);
})

app.listen(3000)