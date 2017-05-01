const url = require('url');
const fs = require('fs');
const auth = require('./secure.json');

function Utils() {}

Utils.prototype.is_production = function() {
    return (fs.existsSync('/var/www/slowin-killer.fr'));
};

Utils.prototype.database_password = function() {
    return Utils.prototype.is_production() ? 'db-prod!' : 'db-dev';
};

Utils.prototype.get_url = function(param_url) {
    return url.parse(param_url, true).pathname.split('/')[1];
};

Utils.prototype.get_db = function(url) {

    // service
    if (url === 'service') {
        return require('../db/service.js');
    }
    // software
    else if (url === 'software') {
        return require('../db/software.js');
    }
    // registry
    else if (url === 'registry') {
        return require('../db/registry.js');
    }
    // startup
    else if (url === 'startup') {
        return require('../db/startup.js');
    }
};


Utils.prototype.count = function(db, content, res) {

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
};

/**
 * @param paramAuth must be equals to following
 * 
 *  - smtp
 *  - http-basic
 *  - db-dev
 *  - db-prod
 */
Utils.prototype.auth = function(paramAuth) {
    return auth.auth[paramAuth];
};

module.exports = Utils;