const router = require('express').Router();
const { Post, User } = require('../../models');
const authenticator = require('../../utils/authenticator');

//get all posts
router.get( '/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'text', 'createdAt'],
        order:[['createdAt', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get a single post by id
router.get('/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: ['id', 'title', 'text', 'createdAt'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(dbPostData) {
            res.json(dbPostData);
        } else {
            res.status(404).json({ message: 'Post not found.'})
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//post a new post
router.post('/', authenticator, (req, res) => {
    Post.create({
        title: req.body.title,
        text: req.body.text,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update post
router.put('/:id', authenticator, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            text: req.body.text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(dbPostData) {
            res.json(dbPostData);
        } else {
            res.status(404).json({ message: 'No post found.'});
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Delete a post
router.delete('/:id', authenticator, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(dbPostData) {
            res.json(dbPostData);
        } else {
            res.status(404).json({ message: 'Post not found!'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;