function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        let err = {
            status: 400,
            message: "You must be logged in to view this page"
        };
        return next(err);
    }
}

module.exports = requiresLogin;