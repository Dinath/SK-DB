const Sequelize = require('sequelize');
const utils__ = require('../ctrl/utils');
const utils = new utils__();

const db_auth = utils.auth(utils.database_password());

const sequelize = new Sequelize('mysql://' + db_auth.user + ':' + db_auth.pass + '@localhost:3306/skdb', {
    define: { freezeTableName: true }
});

sequelize.authenticate()
    .then()
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
        throw err;
    });

const db = {
    sequelize: sequelize,
    Sequelize: Sequelize
};

module.exports = db;