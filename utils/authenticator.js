const authenticator = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } 
    next();
};

module.exports = authenticator;