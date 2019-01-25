let User = require("../../schema/User");

let login = function (req, res, callback) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({"username": username}, function(err, user){
        if(err){
            callback(err, null);
        } else{
            user.comparePassword(password, function(err, isMatch){
                if(err){
                    callback(err);
                } else {
                    if(isMatch) {
                        req.session.userId = user._id;
                    }
                    callback(null, isMatch);
                }
            });
        }
    });
};

module.exports = login;