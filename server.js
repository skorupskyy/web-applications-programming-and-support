var http = require('http');
var fs = require('fs');
var express = require('express');

// var index = fs.readFile("../static/index.html", 'utf8');
// var style = fs.readFile("../static/style.css", 'utf8');
// var script = fs.readFile("../static/script.js", 'utf8');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/', function(req, res) {
    //res.sendFile(__dirname + "/index.html"); 
});

app.get('/index.html', function(req, res) {
    //res.sendFile(__dirname + "/index.html"); 
});

app.get('/style.css', function(req, res) {
    //res.sendFile(__dirname + "/style.css");
});

app.get('/script.js', function(req, res) {
    //res.sendFile(__dirname + "/script.js");
});

app.get('/error404.html', function(req, res) {
    //res.sendFile(__dirname + "/error404.html"); 
});

app.get('/product/:id', function(req, res) {
    var obj = {name: "dell", count: "7", models: ["xps", "vostro", "inspiron"]};
    res.render('product', {productId: req.params.id, obj: obj}); 
});

app.listen(3000);