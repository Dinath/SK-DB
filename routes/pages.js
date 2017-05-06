const express = require('express');
const router = express.Router();

const db_windows = require('../db/index').windows;
const sequelize = require('../db/index').sequelize;

const utils__ = require('../ctrl/utils');
const crud__ = require('./utils/crud');

const utils = new utils__();

router.get('/', function(req, res) {

    const url = utils.get_url(req.originalUrl);
    const db = utils.get_db(url);
    const crud = new crud__(db);

    // const columns = sequelize.query(
    //     'SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = "skdb" AND table_name = "' + db.name + '"', { raw: true }
    // ).then(function(columns) {
    //     console.log(columns);
    // });


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