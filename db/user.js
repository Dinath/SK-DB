const __db = require('./index');
// const utils = require('../ctrl/utils');

const sequelize = __db.sequelize;
const Sequelize = __db.Sequelize;

const table = sequelize.define('user', {
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
    }
}, { define: { freezeTableName: true, timestamps: false } });

table.sync({ force: true }).then(function() {

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

const db = {
    table: table
};

module.exports = db;