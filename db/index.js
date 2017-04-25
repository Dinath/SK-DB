var Sequelize = require('sequelize');

var sequelize = new Sequelize('mysql://root:pass@localhost:3306/skdb');

sequelize.authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
        throw err;
    });

// sequelize.sync().then(function() {});
// sequelize.sync({ force: true }).then(function() {});

var db = {
    sequelize: sequelize,
    Sequelize: Sequelize
};

module.exports = db;