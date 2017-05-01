const express = require('express');
const router = express.Router();

const sequelize = require('../../db/index').sequelize;
const db = require('../../db/registry');

const utils__ = require('../../ctrl/utils');
const crud__ = require('../utils/crud');

const utils = new utils__();
const crud = new crud__(db);

router.get('/', function(req, res) {

    db.table.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(function(content) {
        crud.count(res, content);
    });

});

router.post('/api/web', function(req, res) {

    const url = utils.get_url(req.originalUrl);

    if (req.body.id) {
        crud.update(req, res, url);
    } else if (req.body.reg_path && req.body.reg_name && req.body.reg_value && req.body.reg_type) {
        crud.create(req, res, url);
    } else {
        res.redirect('/' + url);
    }

});

module.exports = router;