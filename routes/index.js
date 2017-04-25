const express = require('express');
const router = express.Router();
const authentification = require('../ctrl/authentification');
// const pages = require('./pages');
const utils__ = require('../ctrl/utils');
const utils = new utils__();

router.use(function(req, res, next) {

    res.locals.user = req.session.user;
    res.locals.url = utils.get_url(req.originalUrl);

    if (req.originalUrl.indexOf('/api/web') !== -1 && !req.session.user) {
        res.redirect('/');
    }

    next();
});

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;