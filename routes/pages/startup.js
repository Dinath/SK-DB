const express = require('express');
const router = express.Router();

const db = require('../../db/index').startup;

const utils__ = require('../../ctrl/utils');
const crud__ = require('../utils/crud');

const utils = new utils__();
const crud = new crud__(db);

router.get('/', function(req, res) {

    db.findAll({
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
        crud.update(res, req, url);
    } else {
        crud.create(res, req, url);
    }

});

module.exports = router;