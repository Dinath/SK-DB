const express = require('express');
const router = express.Router();

const sequelize = require('../db/index').sequelize;
const utils__ = require('../ctrl/utils');
const utils = new utils__();

router.get('/', function(req, res) {

    const url = utils.get_url(req.originalUrl);

    db = utils.get_db(url);

    renderPage(db, res, url);
});


function renderPage(db, res, url) {

    db.table.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ],
        attributes: [
            'id',
            'name',
            'description',
            'approved', [sequelize.fn('date_format', sequelize.col('dateAdded'), '%d-%m-%Y'), 'dateAdded']
        ]

    }).then(function(content) {

        db.table.find({
            raw: true,
            attributes: [
                [sequelize.fn('count', { approved: 1 }), 'countApproved'],
                [sequelize.fn('count', { approved: 0 }), 'countApprovedNone']
            ]
        }).then(function(content_counted) {

            res.render('page', {
                title: db.table.name,
                content: content,
                content_counted: content_counted
            });
        });
    });
}

router.post('/api/web', function(req, res) {

    const url = utils.get_url(req.originalUrl);

    db = utils.get_db(url);

    // this is an update if the id is present
    if (req.body.id) {
        db.table
            .update({
                name: req.body.name,
                description: req.body.description
            }, {
                where: { id: req.body.id }
            })
            .then(function() {
                res.redirect('/' + url);
            });
    }
    // require a name & a description for creation
    else if (req.body.name && req.body.description) {
        db.table
            .create({
                name: req.body.name,
                description: req.body.description,
                approved: req.body.approved == 'on' ? 1 : 0
            }).then(function() {
                res.redirect('/' + url);
            });
    }
    // just render the page
    else {
        res.redirect('/' + url);
    }
});


router.get('/api/web/:approve/:id', function(req, res) {

    const url = utils.get_url(req.originalUrl);

    db = utils.get_db(url);

    db.table.update({
        approved: req.params.approve
    }, {
        where: { id: req.params.id }
    }).then(function() {
        res.redirect('/' + url);
    });
});

module.exports = router;