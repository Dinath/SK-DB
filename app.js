/**
 * Libraries
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');
var auth = require('http-auth');

/**
 * Databases
 */
var db = require('./db/index');

/**
 * Routes
 */

var index = require('./routes/index');
var routes = require('./routes/pages');
var route_auth = require('./routes/auth');
const route_contact = require('./routes/contact');
const route_sk = require('./routes/sk');
const route_email = require('./routes/email');


/**
 * Express
 */
var app = express();

// PUG : view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Configuration
 */
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

var digest = auth.digest({
    realm: "Slowin-Killer",
    file: __dirname + "/ctrl/secure.htdigest"
});

var basic = auth.basic({
    file: __dirname + "/ctrl/secure.htpasswd"
})

/**
 * Routing
 */

app.use('/', index);
app.use('/service', routes);
app.use('/software', routes);
app.use('/startup', routes);
app.use('/registry', routes);
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