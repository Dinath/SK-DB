const express = require('express');
const router = express.Router();
const authentification = require('../ctrl/authentification');
const utils__ = require('../ctrl/utils');
const utils = new utils__();

router.get('/:page', function(req, res) {

    utils.get_db(req.params.page).table.findAll({
        raw: true
    }).then(function(tables) {
        res.send(tables);
    });
});

module.exports = router;