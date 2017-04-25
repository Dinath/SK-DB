function Utils() {}

const url = require('url');

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

module.exports = Utils;