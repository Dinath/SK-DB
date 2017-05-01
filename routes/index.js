const express = require('express');
const router = express.Router();
const utils__ = require('../ctrl/utils');
const utils = new utils__();

const db_windows = require('../db/relations/windows');

router.use(function(req, res, next) {

    res.locals.user = req.session.user;
    res.locals.url = utils.get_url(req.originalUrl);

    // if (req.originalUrl.indexOf('/api/web') > -1 && !req.session.user) {
    //     res.redirect('/');
    // }

    if (res.locals.url === 'service') {
        db_windows.table.findAll({
            raw: true,
            attributes: [
                'id',
                'name'
            ]
        }).then(function(windows) {
            res.locals.windows = windows;
        });
    }

    next();
});

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;