const express = require('express');
const router = express.Router();

const utils__ = require('../../ctrl/utils');
const utils = new utils__();

router.get('/:page/api/web/:approve/:id', function(req, res) {

    const url = req.params.page;
    const db = utils.get_db(url);

    db.table.update({
        approved: req.params.approve
    }, {
        where: { id: req.params.id }
    }).then(function() {
        res.redirect('/' + url);
    });
});

module.exports = router;