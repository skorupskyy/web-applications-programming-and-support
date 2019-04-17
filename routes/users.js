var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
const passport = require('passport');

// models
var User = require('../models/user');
var Product = require('../models/product');
var CartProduct = require('../models/cartProduct');

router.get('/register', function(req, res){
    var errors = req.validationErrors();

    res.render('register', {
        title: "Register",
        errors: errors
    });
});

router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var isAdmin = false;

    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'passwords do not match').equals(req.body.password);
    
    var errors = req.validationErrors();

    if(errors){
        res.render('register', {
            title: "Register",
            errors: errors
        });
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            isAdmin: isAdmin
        });

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    } else {
                        req.flash('success','You are now registered and can log in');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});

router.get('/login', function(req, res){
    var errors = req.validationErrors();

    res.render('login', {
        title: "Login",
        errors: errors
    });
  });

router.post('/login', function(req, res, next){
    passport.authenticate('local', { //to do: multiple strategies
        successRedirect:'/',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
  });

router.get('/shopping_cart', ensureAuthenticated, function(req, res) {
    var query = { userId: req.user._id };
    CartProduct.find(query, function(err, cartprods){
        if(err){
            console.log(err);
        } else {
            res.render("shopping_cart", {
                title: "Shopping cart",
                products: cartprods,
                username: req.user.name
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


module.exports = router;