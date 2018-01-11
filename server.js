var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();
var router = require("./controller/routes.js");

var MONGOLAB_URI = "mongodb://root:root@ds249707.mlab.com:49707/heroku_dzrv80kt";
var PORT = process.env.MONGOLAB_URI || 3000;
//set mongoose to handle ES6 promises
mongoose.Promise = Promise;
if(process.env.MONGOLAB_URI){
    mongoose.connect(MONGOLAB_URI);
}else{
    mongoose.connect("mongodb://localhost/ejsnotes");
}

var db = mongoose.connection;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use("/", router);

app.set('view engine', 'ejs');


app.listen(PORT, function(){
    console.log("Successfully connected to port: " + PORT);
});

//add in code to test user passwords