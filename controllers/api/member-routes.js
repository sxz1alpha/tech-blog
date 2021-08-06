const router = require('express').Router();
const { User } = require('../../models');
const authenticator = require('../../utils/authenticator');


// finds all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbMemberData => res.json(dbMemberData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//finds a specific user by ID
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
    })
    .then(dbMemberData => {
        if(dbMemberData) {
            res.json(dbMemberData);
        } else {
            res.status(404).json({ message: 'User not found.'});
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create a new user
router.post('/', authenticator, (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbMemberData => {
        req.session.save(() => {
            req.session.user_id = dbMemberData.id;
            req.session.username = dbMemberData.username;
            req.session.loggedIn = true;

            res.json(dbMemberData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//User login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbMemberData => {
        if(!dbMemberData) {
            res.status(400).json({ message: 'User not found. '} );
            return;
        }

        const passwordAuth = dbMemberData.checkPassword(req.body.password);

        if(!passwordAuth) {
            res.status(400).json({ message: 'No match found for that user name/password.'} );
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbMemberData.id;
            req.session.username = dbMemberData.username;
            req.session.loggedIn = true;

            res.json( { user: dbMemberData, message: 'Is logged in!' });
        });
    });
});

// logout route

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// change password

router.put('/:id', authenticator, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbMemberData => {
        if(!dbMemberData[0]) {
            res.status(400).json({ message: 'No member found with this id'});
            return;
        }
        res.json(dbMemberData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json();
    });
});

// delete user
router.delete('/:id', authenticator, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbMemberData => {
        if(!dbMemberData) {
            res.status(400).json({ message: 'No member found with this id'});
            return;
        }
        res.json(dbMemberData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;