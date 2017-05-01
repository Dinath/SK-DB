const __db = require('./index');

const sequelize = __db.sequelize;
const Sequelize = __db.Sequelize;

const windows = require('./relations/windows');

const table = sequelize.define('service', {
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

table.hasMany(windows.table);

table.sync().then(function() {
    windows.table.sync().then(function() {
        windows.table.count().then(function(count) {
            if (count === 0) {
                windows.table.create({ name: 'Windows Vista / 7 / 8' }).then(function() {});
                windows.table.create({ name: 'Windows 10' }).then(function() {});
            }
        });
    });
});

const db = {
    table: table
};

module.exports = db;