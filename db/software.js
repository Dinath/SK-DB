const __db = require('./index');
// const utils = require('../ctrl/utils');

const sequelize = __db.sequelize;
const Sequelize = __db.Sequelize;

const table = sequelize.define('software', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    approved: {
        type: Sequelize.BOOLEAN
    },
    pending: {
        type: Sequelize.BOOLEAN
    }
}, { define: { freezeTableName: true, timestamps: false } });

sequelize.sync().then(function() {});

const db = {
    table: table
};

module.exports = db;