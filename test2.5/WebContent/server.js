/*for(var i=0; i<1000; i++) {
	console.log(i);
}*/
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
var path = require('path');

app.get('/', function(req, res) {
	// res.send('Hello, World')
	//console.log(path.join(__dirname + '/index.html'))
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/js/*', function(req, res) {
	// res.send('Hello, World')
	//console.log(path.join(__dirname + req.path))
	res.sendFile(path.join(__dirname + req.path));
})

app.get('/bower_components/*', function(req, res) {
	// res.send('Hello, World')
	//console.log(path.join(__dirname + req.path))
	res.sendFile(path.join(__dirname + req.path));
})

app.post('/res_algo', function(req, res) {
	//console.log(req.body.usuario);
	var usuarios= [
		req.body.usuario,
		req.body.usuario,
		req.body.usuario,
		req.body.usuario,
		req.body.usuario,
		req.body.usuario,
		req.body.usuario,
		req.body.usuario,
		req.body.usuario,
		req.body.usuario
	]
	res.json(usuarios);
})

app.listen(3000)