var http = require('http');
var fs = require('fs');
var express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));

// (1)
// !!! app.use('/static', express.static('static'));
// !!! 1 static url starts with /static
// !!! 2 static local folder name static/..
// if more folders us this!!!

app.get('/', function(req, res) {
    res.render("index"); 
});

app.get('/index', function(req, res) {
    res.render("index");
});

app.get('/error404', function(req, res) {
    res.render("error404");
});

app.get('/product/:id', function(req, res) {
    var obj = {name: "dell", count: "7", models: ["xps", "vostro", "inspiron"]};
    res.render('product', {productId: req.params.id, obj: obj}); 
});


app.get('/css/style.css', function(req, res) {
    //if (1) then use /static/css/style.css
});

app.get('/scripts/errorMenuScript.js', function(req, res) {
    // if (1) then...
});

app.get('/scripts/menuScript.js', function(req, res) {
    // if (1) then...
    //res.sendFile(__dirname + "/menuScript.js");
});

app.listen(3000);