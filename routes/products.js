var express = require('express');
var router = express.Router();

//model
var Product = require('../models/product');



router.get('/add', function(req, res) {
    var errors = req.validationErrors();

    res.render("add_product", {
        title: "Add product",
        errors: errors
    });
});

router.post('/add', function(req, res) {
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

router.get('/edit/:id', function(req, res){
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

router.post('/edit/:id', function(req, res) {
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

router.delete('/:id', function(req, res){
    var query = { _id: req.params.id};

    //console.log(req.params.id);
    Product.remove(query, function(err){
        if(err){
            console.log(err);
        } 
        res.send('Success');
    });
});

router.get('/:id', function(req, res){
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