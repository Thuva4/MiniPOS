let logout = function (req, res, callback) {
    if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                return callback(err);
            } else {
                return callback(null, true);
            }
        });
    }
};

module.exports = logout;