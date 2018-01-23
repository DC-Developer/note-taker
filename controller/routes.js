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

router.get("/api/Users", function(req, res){
    
    let queryString = "SELECT * FROM Users";

    User.query(queryString, function(err, data){
        if (err) res.status(500).send("There was a problem retrieving users from the database.")

        console.log("Retrieved Users");
        res.render("pages/home", {users: data});
    });
   
});

router.get("/api/user", function(req, res){
    var input = req.query.username;
    console.log("The user for notes: " + input);
    let queryString = "SELECT username FROM Users WHERE username = ?";
    var username ;
    User.query(queryString, [input], function(err, results){
        if (err) res.status(500).send("There was a problem retrieving users from the database.")
        console.log(results[0].username);
        username = results[0].username;
        res.render("pages/notes", {user: username});
        // res.send(username);
    });  
});
router.post("/api/user/note", function(req, res){
    
});

module.exports = router; 