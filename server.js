var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var path = require('path');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');

mongoose.connect('mongodb://localhost:27017/webstore');
var db = mongoose.connection;


db.once('open', function(){
    console.log("DB connected");
});
db.on('error', function(err){
    console.log(err);
});


var app = express();

//init mongo
// var mc = mongo.MongoClient;
// var mongourl = "mongodb://localhost:27017/";

var Product = require('./models/product');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// parse application/json
app.use(bodyParser.json())

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('static'));

//express sessions
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

//express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

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

app.post('/login', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    res.render("login_success", {data: req.body});
});

app.get('/product/add', function(req, res) {
    var errors = req.validationErrors();

    res.render("add_product", {
        title: "Add product",
        errors: errors
    });
});

app.post('/product/add', function(req, res) {
    req.checkBody('model', 'model is required').notEmpty();
    req.checkBody('processor', 'processor is required').notEmpty();
    req.checkBody('graficscard', 'graficscard is required').notEmpty();
    req.checkBody('ram', 'ram is required').notEmpty();
    req.checkBody('ssd', 'ssd is required').notEmpty();
    req.checkBody('matrix', 'matrix is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('add_product', {
            title: "Add product",
            errors: errors
        });
    } else {
        let product = new Product();
        product.model = req.body.model;
        product.processor = req.body.processor;
        product.graficscard = req.body.graficscard;
        product.ram = req.body.ram;
        product.ssd = req.body.ssd;
        product.matrix = req.body.matrix;

        product.save(function(err){
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success', 'Product added');
                res.redirect('/');
            }
        });
    }
});

app.get('/product/:id', function(req, res){
    Product.findById(req.params.id, function(err, product){
        if(err){
            console.log(err);
        } else {
            res.render("product", {
                title: "Product card",
                product: product
            });
        }
    });
});

app.get('/product/edit/:id', function(req, res){
    Product.findById(req.params.id, function(err, product){
        if(err){
            console.log(err);
        } else {
            res.render("edit_product", {
                title: "Edit product",
                product: product
            });
        }
    });
});

app.post('/product/edit/:id', function(req, res) {
    let product = {};
    product.model = req.body.model;
    product.processor = req.body.processor;
    product.graficscard = req.body.graficscard;
    product.ram = req.body.ram;
    product.ssd = req.body.ssd;
    product.matrix = req.body.matrix;

    var query = { _id: req.params.id};

    Product.updateOne(query, product, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Product updated');
            res.redirect('/');
        }
    });
});

app.delete('/product/:id', function(req, res){
    var query = { _id: req.params.id};

    //console.log(req.params.id);
    Product.remove(query, function(err){
        if(err){
            console.log(err);
        } 
        res.send('Success');
    });
});

app.get('/product/:model', function(req, res) {
    var query = { model: req.params.model };
    Product.find(query, function(err, products){
        if(err){
            console.log(err);
        } else {
            res.render("product", {
                title: "Product card",
                products: products
            });
        }
    });
});


//images
//to do: image get template
app.get('/images/HTML-404-Error-Page.gif', function(req, res) {
});

app.get('/images/xps-15.jpg', function(req, res) {
});


//styles
app.get('/css/style.css', function(req, res) {
    //if (1) then use /static/css/style.css
});

app.get('/css/footer.css', function(req, res) {
    //if (1) then use /static/css/style.css
});

app.get('/css/product.css', function(req, res) {
    //if (1) then use /static/css/style.css
});

app.get('/scripts/errorMenuScript.js', function(req, res) {
    // if (1) then...
});

app.get('/scripts/menuScript.js', function(req, res) {
    // if (1) then...
    //res.sendFile(__dirname + "/menuScript.js");
});

app.get('/scripts/delete.js', function(req, res) {
    
});

app.get('/bower_components/jquery/dist/jquery.js', function(req, res) { });
app.get('/bower_components/bootstrap/dist/css/bootstrap.js', function(req, res) { });

app.listen(3000);