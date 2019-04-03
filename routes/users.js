var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
const passport = require('passport');

//user model
var User = require('../models/user');


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
            password: password
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

module.exports = router;