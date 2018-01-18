//User model
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "user_ejsDB"
});

connection.connect(function(err){
    if (err) throw err
    console.log("Connected as id: " + connection.threadId);
});

module.exports = connection;
