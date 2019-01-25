let User = require("../../schema/User");

let register = function(req, res, callback) {
    if (req.body && req.body.username && req.body.password){
        var userData = {
            username: req.body.username,
            password: req.body.password
        };
        User.create(userData, function (err, user) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, user);
            }
        });
    } else {
        callback(true, null);
    }
};

module.exports = register;