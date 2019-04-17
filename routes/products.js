var express = require('express');
var router = express.Router();
const passport = require('passport');

//models
var Product = require('../models/product');
var User = require('../models/user');
var CartProduct = require('../models/cartProduct');
var ShoppingCart = require('../models/shoppingCart');

router.get('/add', ensureAuthenticated, function(req, res) {
    var errors = req.validationErrors();

    res.render("add_product", {
        title: "Add product",
        errors: errors
    });
});

router.post('/add', ensureAuthenticated, function(req, res) {
    req.checkBody('model', 'model is required').notEmpty();
    req.checkBody('processor', 'processor is required').notEmpty();
    req.checkBody('graficscard', 'graficscard is required').notEmpty();
    req.checkBody('ram', 'ram is required').notEmpty();
    req.checkBody('ssd', 'ssd is required').notEmpty();
    req.checkBody('matrix', 'matrix is required').notEmpty();
    req.checkBody('pageid', 'pageid is required').notEmpty();
    req.checkBody('price', 'price is required').notEmpty();

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
        product.pageid = req.body.pageid;   
        product.price = req.body.price;
        product.discount = 0;

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


router.get('/add_to_cart/:id/:model/:price', ensureAuthenticated, function(req, res){
    // var strid = req.user._id.toString();
    // var query = { userId: s};
    // console.log(req.params.model);
    // console.log(req.params.price);
    let cp = new CartProduct();
    cp.userId = req.user._id.toString();
    cp.userName = req.user.name.toString();
    cp.productId = req.params.id;
    cp.productName = req.params.model;
    cp.productPrice = req.params.price;
    cp.count = 1;
    //to do: make count prop a type of Number
    cp.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Product added to shopping cart');
            res.redirect('/users/shopping_cart');
        }
    });
    // CartProduct.findOne(query, function(err, cp){ ....

        // if(cp._id == '5cb654e21e9bdd3a4c33a9ea'){
        //     //add new cart_product
        //     //let cp = new CartProduct();
        //     console.log('sc')
        // } else {
        //     //create new sc
        //     console.log("shopping cart not found")
        // }
});


router.get('/edit/:id', ensureAuthenticated, function(req, res){
    Product.findById(req.params.id, function(err, product){
        // User.findById(req.user._id, function(err, user){
        //     if(!user.isAdmin){
        //         req.flash('danger', 'You do not have access to this page');
        //         res.redirect('/');
        //     }
            if(err){
                console.log(err);
            } else {
                res.render("edit_product", {
                    title: "Edit product",
                    product: product
                });
            }
        //});
    });
});

router.post('/edit/:id', ensureAuthenticated, function(req, res) {
    let product = {};
    product.model = req.body.model;
    product.processor = req.body.processor;
    product.graficscard = req.body.graficscard;
    product.ram = req.body.ram;
    product.ssd = req.body.ssd;
    product.matrix = req.body.matrix;
    product.pageid = req.body.pageid;
    product.price = req.body.price;
    product.discount = req.body.discount;
    
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

router.get('/add_discount/:id', ensureAuthenticated, function(req, res){
    Product.findById(req.params.id, function(err, product){
        if(err){
            console.log(err);
        } else {
            res.render("add_discount", {
                title: "Add discount",
                product: product
            });
        }
    });
});

router.post('/add_discount/:id', ensureAuthenticated, function(req, res) {
    let product = {};
    product.discount = req.body.discount;
    
    var query = { _id: req.params.id};

    Product.updateOne(query, product, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Discount added!');
            res.redirect('/');
        }
    });
});

router.delete('/:id', ensureAuthenticated, function(req, res){
    var query = { _id: req.params.id};

    //console.log(req.params.id);
    Product.remove(query, function(err){
        if(err){
            console.log(err);
        } 
        res.send('Success');
    });
});

router.get('/:id', ensureAuthenticated, function(req, res){
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

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/users/login');
    }
  }

//                             |
//to do: something with that  \|/

// app.get('/product/:model', function(req, res) {
//     var query = { model: req.params.model };
//     Product.find(query, function(err, products){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("product", {
//                 title: "Product card",
//                 products: products
//             });
//         }
//     });
// });

module.exports = router;