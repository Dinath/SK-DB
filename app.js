/**
 * Libraries
 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const session = require('express-session');
const minify = require('express-minify');
const auth = require('http-auth');
const compression = require('compression');
const Utils = require('./ctrl/utils');
const utils = new Utils();

/**
 * Databases
 */
const db = require('./db/index');

/**
 * Routes
 */

const index = require('./routes/index');

// const route_service = require('./routes/pages/service');
// const route_software = require('./routes/pages/software');
// const route_startup = require('./routes/pages/startup');
// const route_registry = require('./routes/pages/registry');

const routes_common = require('./routes/utils/common');

const route_pages = require('./routes/pages');

const route_auth = require('./routes/auth');
const route_contact = require('./routes/contact');
const route_sk = require('./routes/sk');
const route_email = require('./routes/email');

const fail2ban = require('express-fail2ban');
const fail2banConfig = require('express-fail2ban/config');

new fail2banConfig().init();

/**
 * Express
 */
var app = express();
app.use(compression());
app.use(fail2ban({
    // log_access: true,
    // debug: true
}));


// PUG : view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Configuration
 */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(minify({ cache: __dirname + '/cache' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(session({
    secret: '4f5ef4r52rf1re5f24r1efsf',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: utils.is_production() }
}));

const basic = auth.basic({
    file: __dirname + "/ctrl/secure.htpasswd"
});

/**
 * Routing
 */

app.use('/', index);
app.use('/software', route_pages);
app.use('/startup', route_pages);
app.use('/service', route_pages);
app.use('/registry', route_pages);

app.use('/com', routes_common);
app.use('/auth', route_auth);
app.use('/contact', route_contact);
app.use('/sk', auth.connect(basic), route_sk);
app.use('/email', route_email);

/**
 * Catching...
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;