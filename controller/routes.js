var express = require('express');
var router = express.Router();
var logger = require('morgan');
var mongoose = require('mongoose');

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
    
});


module.exports = router; 