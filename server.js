var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser')
var mongo = require('mongodb');
var path = require('path');
var mongoose = require('mongoose');

//init mongoose
mongoose.connect('mongodb://localhost:27017/webstore');
var db = mongoose.connection;

//check for db connection and errors
db.once('open', function(){
    console.log("DB connected");
});
db.on('error', function(err){
    console.log(err);
});

//init app
var app = express();

//init mongo
// var mc = mongo.MongoClient;
// var mongourl = "mongodb://localhost:27017/";

var Product = require('./models/product');

//init bodyParser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('static'));

// (1)
// !!! app.use('/static', express.static('static'));
// !!! 1 static url starts with /static
// !!! 2 static local folder name static/..
// if more folders us this!!!

app.get('/', function(req, res) {
    Product.find({}, function(err, products){
        if(err){
            console.log(err);
        } else {
            res.render("index", {
                title: "Home",
                products: products
            });
        }
    }); 
});

//Todo: add titles to other pages(prdct, lgn...)
app.get('/index', function(req, res) {
    Product.find({}, function(err, products){
        if(err){
            console.log(err);
        } else {
            res.render("index", {
                title: "Home",
                products: products
            });
        }
    }); 
});

app.get('/error404', function(req, res) {
    res.render("error404", {
        title: "Error 404"
    });
});

app.get('/login', function(req, res) {
    res.render("login");
});

app.get('/temp', function(req, res) {
    res.render("temp");
});

app.post('/login', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    res.render("login_success", {data: req.body});
});

app.get('/product/:id', function(req, res) {
    // var obj = {name: "dell", count: "7", pars: ["intel core i7", "nvidia geforce 960", "ssd 512Gb", "full hd ips"]};
    var obj;
    var id = req.params.id;
    mc.connect(mongourl, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("webstore");
        var query = { _id: id };
        dbo.collection("products").findOne({}, function(err, result) {
            if (err) throw err;
            console.log(result);
            obj = {name: result.name, processor: result.processor};
            console.log(obj);
            res.render('product', {productId: id, obj: obj});
            db.close();
        });
    });
    console.log(id);
});

app.get('/images/HTML-404-Error-Page.gif', function(req, res) {
});

app.get('/images/xps-15.jpg', function(req, res) {
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