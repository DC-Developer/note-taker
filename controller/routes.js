var express = require('express');
var router = express.Router();
var logger = require('morgan');
var mongoose = require('mongoose');

var User = require('../models/user.js');
var Note = require('../models/notes.js');
//require models later


//default route rendering index.ejs
router.get("/", function(req, res){
    res.render("pages/login");
});

router.get("/home", function(req, res){
    res.render("pages/home");
});

router.get("/notes", function(req, res){
    res.render("pages/notes");
});
//make endpoints for api
router.post("/auth", function(req, res){
    //take the req.body and add it to the username key field
    

    // User.findOne({ email: req.body.email }, function(err, user) {
    //     if (err) throw err;
    
    //     // test a matching password
    //     user.comparePassword('Password123', function(err, isMatch) {
    //         if (err) throw err;
    //         console.log('Password123:', isMatch); // -&gt; Password123: true
    //     });
    
    //     // test a failing password
    //     user.comparePassword('123Password', function(err, isMatch) {
    //         if (err) throw err;
    //         console.log('123Password:', isMatch); // -&gt; 123Password: false
    //     });
    // });
    User.create(req.body)
        .then(function(dbUser) {
            console.log(dbUser);
            //if user is created successfully, render the home page
            res.render("pages/home");
        })
        .catch(function(err) {
            res.json(err);
        });
});


module.exports = router; 