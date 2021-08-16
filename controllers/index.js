const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');
const addPostRoute = require('./addPost-route');

const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post', addPostRoute)
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
