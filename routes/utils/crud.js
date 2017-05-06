const sequelize = require('../../db/index').sequelize;

let db;

function CRUD(db) {
    this.db = db;
}

CRUD.prototype.create = function(res, req, url) {

    this.db.create(req.body).then(function() {
        res.redirect('/' + url);
    });
};


CRUD.prototype.update = function(res, req, url) {

    this.db.update(req.body, {
        where: { id: req.body.id }
    }).then(function() {
        res.redirect('/' + url);
    });
};

CRUD.prototype.count = function(res, content) {

    let db = this.db;

    db.count({ where: ['approved = ?', true] }).then(function(content_counted) {

        res.render('page', {
            title: db.name,
            content: content,
            content_counted: content_counted
        });
    });
};



module.exports = CRUD;