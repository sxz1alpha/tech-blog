const authenticator = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    }  else {
        next();
    }
};

module.exports = authenticator;