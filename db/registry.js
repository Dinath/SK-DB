const __db = require('./index');
// const utils = require('../ctrl/utils');

const sequelize = __db.sequelize;
const Sequelize = __db.Sequelize;

const table = sequelize.define('registry', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    reg_path: {
        type: Sequelize.STRING
    },
    reg_name: {
        type: Sequelize.STRING
    },
    reg_value: {
        type: Sequelize.STRING
    },
    reg_type: {
        type: Sequelize.STRING
    },
    approved: {
        type: Sequelize.BOOLEAN
    },
    pending: {
        type: Sequelize.BOOLEAN
    }
}, { define: { freezeTableName: true, timestamps: false } });

table.sync();

const db = {
    table: table
};

module.exports = db;