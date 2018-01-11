var mongoose = require('mongoose'), 
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var schema = mongoose.Schema;

var UserSchema = new schema({
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
        required: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: "Password is Required",
        validate: [
            function(input) {
              return input.length >= 6;
            },
            "Password should be longer."
          ]
    },
    date: {
        type: Date,
        default: Date.now
      }
});

UserSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var User = mongoose.model("User", UserSchema);

module.exports = User;

