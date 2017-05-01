const __db = require('.././index');

const sequelize = __db.sequelize;
const Sequelize = __db.Sequelize;

const table = sequelize.define('windows', {
    name: {
        type: Sequelize.STRING
    }
}, { define: { freezeTableName: true, timestamps: false } });

// table.sync().then(function() {

//     table.count().then(function(count) {
//         if (count === 0) {
//             table.create({ name: 'Windows Vista / 7 / 8' }).then(function() {});
//             table.create({ name: 'Windows 10' }).then(function() {});
//         }
//     });
// });

const db = {
    table: table
};

module.exports = db;