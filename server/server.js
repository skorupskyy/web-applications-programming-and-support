var http = require('http');
var fs = require('fs');
var express = require('express');

// var index = fs.readFile("../static/index.html", 'utf8');
// var style = fs.readFile("../static/style.css", 'utf8');
// var script = fs.readFile("../static/script.js", 'utf8');

var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html"); 
});

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/style.css");
});

app.get('/script.js', function(req, res) {
    res.sendFile(__dirname + "/script.js");
});

app.get('/:id', function(req, res) {
    res.send("id: " + req.params.id);
});


app.listen(3000);