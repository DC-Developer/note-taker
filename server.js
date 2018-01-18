var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();
var router = require("./controller/routes.js");
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use("/", router);

app.set('view engine', 'ejs');


app.listen(PORT, function(){
    console.log("Successfully connected to port: " + PORT);
});

//add in code to test user passwords