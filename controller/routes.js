var express = require('express');
var router = express.Router();
var logger = require('morgan');
var mongoose = require('mongoose');

//require models later

router.get("/", function(req, res){
    res.render("pages/index");
});

module.exports = router; 