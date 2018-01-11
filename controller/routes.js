var express = require('express');
var router = express.Router();
var logger = require('morgan');
var mongoose = require('mongoose');

var User = require('../models/user.js');
var Note = require('../models/notes.js');
//require models later


router.post("/auth", function(req, res){
   

});

router.get("/", function(req, res){
    res.render("pages/login");
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

router.get("/notes", function(req, res){
    var username = req.body;
    res.render("pages/notes",{
        user: username
    });
});
//make endpoints for api



module.exports = router; 