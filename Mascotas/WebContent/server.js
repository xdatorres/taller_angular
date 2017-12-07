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

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + req.path));
})

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bd_curso'
});

connection.connect();
 
connection.query('SELECT * FROM ESPECIE', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();

app.listen(3000)