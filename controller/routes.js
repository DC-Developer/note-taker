var express = require('express');
var router = express.Router();
var logger = require('morgan');
var mongoose = require('mongoose');

var User = require('../models/user.js');
var Note = require('../models/notes.js');
//require models later

router.get("/", function(req, res){
    res.render("pages/login");
});
router.post("/auth", function(req, res){
    var user = req.body;
    User.create(user)
     .then(function(data){
         console.log("You have successfully created: " + user.username);
         res.redirect("/home");
     })
     .catch(function(err){
        res.json(err);
     })
     
 
 });

router.get("/home", function(req, res){
   
    User.find({})
        .then(function(data){
            res.render("pages/home", {
                users: data
            });
        })
        .catch(function(err){
            res.json(err);
        })
});

router.post("/notes", function(req, res){
    var username = req.body.username;
    console.log("username: " + username);
    res.render("pages/notes",{
        user: username
    });
});
//make endpoints for api



module.exports = router; 