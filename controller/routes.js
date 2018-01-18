var express = require('express');
var router = express.Router();
var logger = require('morgan');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require("../config/connection.js");
var verifyToken = require("../auth/authenticate.js");

router.get("/", function(req, res){
    res.render("pages/login");
});
router.post("/api/register", function(req, res){
    var user = req.body;
    var encryptedPassword = bcrypt.hashSync(req.body.password, 8);

    let queryString = "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)"; 

     User.query(queryString,[req.body.username, req.body.email, encryptedPassword], function(err, dbUser){
        if(err) return res.status(500).send("There was a problem registering the user.")
        //now create token
        //change the secret to be stored in a seperate file as an environmental variable
        var token = jwt.sign({id: dbUser._id}, 'secret', {
            expiresIn: 86400//expires in 24 hours
        } );
        res.status(200).send({auth: true, token: token});
        console.log("Successfully created user!");
     } );
   

 });

router.get("/home", function(req, res){
   
   
});

router.get("/api/:username?", function(req, res){
    var username = 'baggins';
    console.log("username: " + username);
    res.render("pages/notes",{
        user: username
    });
});
//make endpoints for api

module.exports = router; 