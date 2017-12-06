/*for(var i=0; i<1000; i++) {
	console.log(i);
}*/
var express = require('express')
var app = express()
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

app.get('/videos/*', function(req, res) {
	// res.send('Hello, World')
	//console.log(path.join(__dirname + req.path))
	res.sendFile(path.join(__dirname + req.path));
})


app.listen(3000)