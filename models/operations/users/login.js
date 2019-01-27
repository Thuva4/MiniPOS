let User = require("../../schema/User");

let login = function (req, res, callback) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({"username": username}, function(err, user){
        if(err){
            callback(err);
        } else{
            try {
                user.comparePassword(password, function(err, isMatch){
                    if(err){
                        callback(err);
                    } else {
                        if(isMatch) {
                            callback(null, user);
                        }
                        else{
                            let err = {
                                status : 400,
                                message : "Athentication Failed!"
                            };
                            callback(err);
                        }
                    }
                });
            } catch(err){
                let error = {
                    status : 400,
                    message : err
                };
                callback(error);
            }
        }
    });
};

module.exports = login;