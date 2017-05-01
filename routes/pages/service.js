const express = require('express');
const router = express.Router();

const sequelize = require('../../db/index').sequelize;
const db = require('../../db/service');
const db_windows = require('../../db/relations/windows').table;

const utils__ = require('../../ctrl/utils');
const crud__ = require('../utils/crud');

const utils = new utils__();
const crud = new crud__(db);

router.get('/', function(req, res) {

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

    db.setWindows(db_windows.findOne({ where: { id: 1 } })).then(function(windows) {
        db.windows([windows]).then(function() {
            crud.update(res, req, url);
        });
    });

    // if (req.body.id) {
    //     crud.update(res, req, url);
    // } else {
    //     crud.create(res, req, url);
    // }

});

module.exports = router;