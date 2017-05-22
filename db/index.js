const Sequelize = require('sequelize');
const utils__ = require('../ctrl/utils');
const utils = new utils__();

const db_auth = utils.auth(utils.database_password());

const sequelize = new Sequelize('mysql://' + db_auth.user + ':' + db_auth.pass + '@localhost:3306/skdb', {
    define: { freezeTableName: true },
    logging: false
});

sequelize.authenticate()
    .then()
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
        throw err;
    });

let startup = sequelize.define('startup', {
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

let software = sequelize.define('software', {
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

let service = sequelize.define('service', {
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

let windows = sequelize.define('windows', {
    name: {
        type: Sequelize.STRING
    }
}, { define: { freezeTableName: true, timestamps: false } });

let user = sequelize.define('user', {
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

let registry = sequelize.define('registry', {
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

let service_windows = sequelize.define('service_windows', {}, { define: { freezeTableName: true, timestamps: false } });

/**
 * Associations
 */
// service.hasMany(windows, { as: 'windows' });
// windows.belongsTo(service);
windows.belongsToMany(service, { through: service_windows });
service.belongsToMany(windows, { through: service_windows });

sequelize.sync().then(function() {

    // Users
    user.sync({ force: true }).then(function() {
        user.create({
            name: 'Dinath',
            description: 'Développeur de Slowin\' Killer',
            email: 'dinath.contact@gmail.com',
            password: 'pass',
            approved: true,
            contributor: true,
            administrator: true
        });
    });

    // Windows
    windows.sync().then(function() {
        windows.count().then(function(count) {
            if (count === 0) {
                windows.create({ name: 'Windows Vista / 7 / 8' }).then(function() {});
                windows.create({ name: 'Windows 10' }).then(function() {});
            }
        });
    });

    // services test

    // service.sync().then(function() {
    //     windows.findAll().then(function(o) {
    //         service.setWindows(o).then(function() {

    //         });
    //     });
    // });
});

const db = {
    startup: startup,
    service: service,
    registry: registry,
    software: software,
    windows: windows,
    user: user,
    sequelize: sequelize,
    Sequelize: Sequelize
};

module.exports = db;