let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre("save", function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(givenPassword, callback){
    var user = this;
    bcrypt.compare(givenPassword, user.password, function(err, isMatch){
        if(err){
            callback(err);
        } else {
            callback(null, isMatch);
        }
    });
};

let User = mongoose.model("User", UserSchema);

module.exports = User;