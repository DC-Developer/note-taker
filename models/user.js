var mongoose = require('mongoose');
// , 
//     bcrypt = require('bcrypt'),
//     SALT_WORK_FACTOR = 10;
//add in encryption and password later
var schema = mongoose.Schema;

var UserSchema = new schema({
    username: {
        type: String,
        required: "Username required!",
        index: {unique: true},
        validate: [
            function(input) {
              return input.length >= 6;
            },
            "Username should be longer."
          ]
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
        required: true,
        index: {unique: true}
    },
    // password: {
    //     type: String,
    //     required: "Password is Required",
    //     validate: [
    //         function(input) {
    //           return input.length >= 6;
    //         },
    //         "Password should be longer."
    //       ]
    // },
    date: {
        type: Date,
        default: Date.now
      }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

