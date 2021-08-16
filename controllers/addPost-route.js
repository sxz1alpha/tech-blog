const router = require("express").Router();
const { Post, User, Comment } = require('../models');
const authenticator = require('../utils/authenticator');

router.get('/', authenticator, (req, res) => {
    res.render('addPost', { loggedIn: true });
});

module.exports = router;