var db = require('./index');

var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var table = sequelize.define('service', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    approved: {
        type: Sequelize.BOOLEAN
    },
    dateAdded: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

sequelize.sync().then(function() {});

var db = {
    table: table
};

module.exports = db;