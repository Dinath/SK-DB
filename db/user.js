var db = require('./index');

var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

var table = sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    contributor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    administrator: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    dateAdded: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

sequelize.sync({ force: true }).then(function() {
    table.create({
        name: 'Dinath',
        description: 'Développeur de Slowin\' Killer',
        email: 'dinath.contact@gmail.com',
        password: 'pass',
        approved: true,
        contributor: true,
        administrator: true
    });
});

var db = {
    table: table
};

module.exports = db;