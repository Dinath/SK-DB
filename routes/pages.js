const express = require('express');
const router = express.Router();

const sequelize = require('../db/index').sequelize;
const db = require('../db/registry');
const db_windows = require('../db/relations/windows').table;

const utils__ = require('../ctrl/utils');
const crud__ = require('./utils/crud');

const utils = new utils__();

router.get('/', function(req, res) {

    const url = utils.get_url(req.originalUrl);
    const db = utils.get_db(url);
    const crud = new crud__(db);

    db.table.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ],
        include: [db_windows]
    }).then(function(content) {
        crud.count(res, content);
    });

});

router.post('/api/web', function(req, res) {

    const url = utils.get_url(req.originalUrl);
    const db = utils.get_db(url);
    const crud = new crud__(db);

    if (req.body.id) {
        crud.update(res, req, url);
    } else if (req.body) {
        crud.create(res, req, url);
    } else {
        res.redirect('/' + url);
    }

});

module.exports = router;