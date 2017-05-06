const express = require('express');
const router = express.Router();

const db = require('../../db/index').service;
const db_windows = require('../../db/index').windows;

const utils__ = require('../../ctrl/utils');
const crud__ = require('../utils/crud');

const utils = new utils__();
const crud = new crud__(db);

router.get('/', function(req, res) {

    db.findAll({
        order: [
            ['id', 'DESC']
        ],
        include: [{
            model: db_windows,
            as: 'windows'
        }]
    }).then(function(content) {
        // console.log(content.windows);
        // console.log(content[0].get('windows'));
        crud.count(res, content);
    });

});

router.post('/api/web', function(req, res) {

    const url = utils.get_url(req.originalUrl);

    let service = db.build(req.body);

    let windows = [];

    for (let o in req.body) {

        if (o.startsWith('windows')) {

            let id = o.split('.')[1];
            let checked = req.body[o] == 'on';
            console.log(checked);

            if (!checked) continue;

            db_windows.findOne({ where: { id: id } }).then(function(w) {
                windows.push(w);
            });
        }
    }

    service.save().then(function() {

        service.setWindows(windows).then(function() {

            service.save().then(function() {

                res.redirect('/' + url);

            });

        });

    });

});

module.exports = router;